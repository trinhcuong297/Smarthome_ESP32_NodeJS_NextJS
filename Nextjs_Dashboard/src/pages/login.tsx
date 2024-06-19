import { buttonVariants } from "@/components/ui/button";
import { useUserDataContext } from "@/context/UserDataContext";
import { useWebSocketContext } from "@/context/WebSocketContext";
import { cn } from "@/lib/utils";
import Head from "next/head";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
})

export default function Login() {
  const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try
    {
      const bodyReq = {
        "email": values.username,
        "password": values.password
      }
      const response = await fetch("http://localhost:3005/v1/api/access/user/login",
        {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyReq)
        }
      );
      const responseMessage = await response.json();
      console.log(await responseMessage);
      if(responseMessage?.message)
      toast({
        title: await responseMessage.message,
        className: "bg-red-500 text-white"
      })
      else if(responseMessage?.token && responseMessage?.userId)
        {
          await setUserSession(responseMessage);
          await setUserAttributes({name: values.username, email: values.username})
          toast({
            title: "Logged In",
            className: "bg-green-500"
          })
          await router.push("/")
        }
    }
    catch(err: any)
    {
      console.log(err)
      // toast({
      //   title: await err
      // });
    }
    
  }

  return (
    <>
      <Head>
      <title>Legend - Smart Home System with AWS</title>
      </Head>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <Toaster />

        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-white" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link
            href={'/'}
            target="_blank"
          >
            <Image src="/logo.svg" width={0} height={0} sizes="100vw" style={{ width: 'auto' }} className='h-14 dark:bg-white' alt=''/>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="trinhcuong297@gmail.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
          <div className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
      
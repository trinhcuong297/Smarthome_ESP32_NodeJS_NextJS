"use client"

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
import { toast } from "@/components/ui/use-toast"
import { useUserDataContext } from "@/context/UserDataContext"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  deviceId: z.string().min(2, {
    message: "Invalid device ID",
  }),
})

export function ClaimDevice() {
  const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      deviceId: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>): Promise<any> {
    toast({
      title: `Claiming device : ${data.deviceId}`,
      description: ""
    })
    try
    {
      setLoading(true);
      const response: any = await fetch(`https://smarthome-esp32-nodejs-nextjs.onrender.com/v1/api/device/claim`,
        {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "CLIENT_ID": userSession.userId,
                "ACCESS_TOKEN": userSession.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "deviceID": data.deviceId,
                "userID": userSession.userId,
            })
        }
    );
    console.log(await response.json())
      if (response.ok)
      {
        toast({
          title: `Claim device ${data.deviceId} successfully`,
          className: "bg-emerald-300"
        })
      }
      else {
        throw new Error();
      }
    }
    catch (err)
    {
      console.log(err)
      toast({
        title: `Failed to claim device ${data.deviceId}`,
        className: "bg-red-500 text-white"
      })
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="deviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device ID</FormLabel>
              <FormControl>
                <Input placeholder="Example: abcd1234" {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        { loading ? 
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button> :
          <Button type="submit" className="w-full">Submit</Button>
        }
      </form>
    </Form>
  )
}

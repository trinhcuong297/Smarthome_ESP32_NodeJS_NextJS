import { Authenticator, Button, Heading, Image, Text, View, useAuthenticator, useTheme } from "@aws-amplify/ui-react";

const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.medium}>
          <Image
            alt="Amplify logo"
            src="/logo.svg"
            width={200}
            height={100}
          />
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color="black">
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        );
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toForgotPassword}
              size="small"
              variation="link"
            >
              Reset Password
            </Button>
          </View>
        );
      },
    },
  
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a new account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
  
        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
            >
              Back to Sign In
            </Button>
          </View>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Confirm Sign Up
          </Heading>
        );
      },
    },
    SetupTotp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Setup TOTP
          </Heading>
        );
      },
    },
    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign In
          </Heading>
        );
      },
    },
    ForgotPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Reset Password
          </Heading>
        );
      },
    },
    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Reset Password
          </Heading>
        );
      },
    },
  };
  
const formFields = {
signIn: {
    username: {
    placeholder: 'Enter your email',
    },
},
signUp: {
    password: {
    label: 'Password:',
    placeholder: 'Enter your Password:',
    isRequired: false,
    order: 4,
    },
    confirm_password: {
    label: 'Confirm Password:',
    order: 3,
    },
    email: {
    order: 2
    },
    name:{
    order: 1
    }
},
forceNewPassword: {
    password: {
    placeholder: 'Enter your Password:',
    },
},
forgotPassword: {
    username: {
    placeholder: 'Enter your email:',
    },
},
confirmResetPassword: {
    confirmation_code: {
    placeholder: 'Enter your Confirmation Code:',
    label: 'New Label',
    isRequired: false,
    },
    confirm_password: {
    placeholder: 'Enter your Password Please:',
    },
},
setupTotp: {
    QR: {
    totpIssuer: 'test issuer',
    totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
    label: 'New Label',
    placeholder: 'Enter your Confirmation Code:',
    isRequired: false,
    },
},
confirmSignIn: {
    confirmation_code: {
    label: 'New Label',
    placeholder: 'Enter your Confirmation Code:',
    isRequired: false,
    },
},
};

export default function AuthAWS ({children}: {children: React.ReactNode}) {
    return <Authenticator 
    socialProviders={['google']} 
    signUpAttributes={['name']} 
    formFields={formFields} 
    components={components}
    className="bg-[url('/auth_bg.svg')] bg-cover h-max min-h-screen w-full bg-fixed">
      {children}
    </Authenticator>
}
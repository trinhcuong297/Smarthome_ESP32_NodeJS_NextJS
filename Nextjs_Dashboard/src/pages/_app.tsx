import "@/styles/globals.css";
import '@aws-amplify/ui-react/styles.css';

import type { AppProps } from "next/app";
import { Amplify } from 'aws-amplify';

import AuthAWS from "@/components/Auth";
import Head from "next/head";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { UserDataProvider } from "@/context/UserDataContext";
import { WebSocketProvider } from "@/context/WebSocketContext";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "	us-east-1_SeqeBD60b",
      userPoolClientId: "28agse0856a2p1s56br2m33m42",
      identityPoolId: "us-east-1:63d1bb49-78cf-4c98-8d63-3d2f2089c3b9",
      loginWith: {
        email: true,
        oauth: {
          domain:"nextcog.auth.us-east-1.amazoncognito.com",
          scopes: ['email', 'openid', 'phone', 'email', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: ["http://localhost:3000", "https://smarthomedashboardproject.vercel.app"],
          redirectSignOut: ["http://localhost:3000", "https://smarthomedashboardproject.vercel.app"],
          responseType: 'code',
          providers: ['Google']
        }
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider
  attribute="class"
  defaultTheme="light"
  >
    <Head>
      <title>Legend - Smart Home System</title>
    </Head>
    <AuthAWS>
      <UserDataProvider>
        <WebSocketProvider>
          {/* <DataLayout></DataLayout> */}
          <Component {...pageProps} />;
        </WebSocketProvider>
      </UserDataProvider>
    </AuthAWS>
  </ThemeProvider>
}

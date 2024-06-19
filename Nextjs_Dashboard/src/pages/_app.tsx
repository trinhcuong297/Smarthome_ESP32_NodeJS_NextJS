import "@/styles/globals.css";
import '@aws-amplify/ui-react/styles.css';

import type { AppProps } from "next/app";
import Head from "next/head";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { UserDataProvider } from "@/context/UserDataContext";
import { WebSocketProvider } from "@/context/WebSocketContext";

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider
  attribute="class"
  defaultTheme="light"
  >
    <Head>
      <title>Legend - Smart Home System</title>
    </Head>
      <UserDataProvider>
          <WebSocketProvider>
            <Component {...pageProps} />
          </WebSocketProvider>
      </UserDataProvider>
  </ThemeProvider>
}

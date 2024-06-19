import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
            rel="icon"
            href="/logo.svg"
            type="image/x-icon"
        />
      </Head>
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}

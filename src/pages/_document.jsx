/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta
          name="description"
          content="Platform for exports organisers to conduct events and generate revenue"
        />
        <title>Game Centric</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

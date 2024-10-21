import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload only critical font files */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLPTed3FBGPaTSQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfed3FBGPaTSQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Link stylesheet for other font variants */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

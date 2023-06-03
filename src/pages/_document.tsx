import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from './navbar/Navbar'
import { Inter } from 'next/font/google';
export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

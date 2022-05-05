import Document,{Head, Html, Main, NextScript} from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
      <Head>
      <title>share.news</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:ital,wght@0,400;1,600&family=Roboto:ital,wght@0,400;0,900;1,700&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    );
  }
}
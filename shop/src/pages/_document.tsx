import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    // const { locale } = this.props.__NEXT_DATA__;
    // const dir = getDirection(locale);
    return (
      // <Html dir={dir}>
      <Html>
        <Head>
        <link rel="icon" href="/icons/apple-icon-180.png" type="image/png" />
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=optional"
            rel="stylesheet"
          /> */}
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

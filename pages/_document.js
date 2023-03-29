import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        // Cookie consent
        const iub = `
            <script type="text/javascript">
                var _iub = _iub || [];
                _iub.csConfiguration = {"consentOnContinuedBrowsing":false,"countryDetection":true,"enableCcpa":true,"gdprAppliesGlobally":false,"invalidateConsentWithoutLog":true,"lang":"en","perPurposeConsent":true,"siteId":1286059,"whitelabel":false,"cookiePolicyId":87845246, "banner":{ "acceptButtonCaptionColor":"#ffffff","acceptButtonColor":"#886700","acceptButtonDisplay":true,"applyStyles":false,"backgroundColor":"#f1f1f1","closeButtonDisplay":false,"customizeButtonCaptionColor":"#222222","customizeButtonColor":"#f1f1f1","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-right","rejectButtonCaptionColor":"white","rejectButtonColor":"#545454","rejectButtonDisplay":true,"textColor":"#222" }};
            </script>
            <script type="text/javascript" src="//cdn.iubenda.com/cs/ccpa/stub.js"></script>
            <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>
        `

        return (
            <Html lang='en'>
                <Head>
                    <link rel='shortcut icon' href='/favicon.ico' />
                    <link
                        rel='stylesheet'
                        href='https://use.typekit.net/bvl5rhi.css'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div dangerouslySetInnerHTML={{ __html: iub }} />
                </body>
            </Html>
        )
    }
}

export default MyDocument

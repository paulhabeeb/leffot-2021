// const ContentSecurityPolicy = `
//     default-src 'self';
//     script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.vimeo.com *.bigcommerce.com *.paypal.com vitals.vercel-insights.com *.typekit.net;
//     child-src *.youtube.com *.vimeo.com *.bigcommerce.com *.paypal.com vitals.vercel-insights.com *.typekit.net;
//     style-src 'self' 'unsafe-inline' *.typekit.net;
//     img-src * blob: data:;
//     media-src 'none';
//     connect-src *;
//     font-src 'self' *.typekit.net;
// `

const securityHeaders = [
    // {
    //     key: 'Content-Security-Policy',
    //     value: ContentSecurityPolicy.replace(/\n/g, ''),
    // },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=()',
    },
    {
        key: 'Referrer-Policy',
        value: 'same-origin',
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubdomains; preload',
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
]

function generateHeaders() {
    return [
        {
            source: '/',
            headers: securityHeaders,
        },
        {
            source: '/:path*',
            headers: securityHeaders,
        },
    ]
}

module.exports = generateHeaders

const path = require('path')
const generateRedirects = require('./lib/generate-redirects')
const generateHeaders = require('./lib/generate-headers')
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
    images: {
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ['cdn11.bigcommerce.com', 'images.prismic.io'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@components': path.join(__dirname, 'components'),
            '@framework': path.join(
                __dirname,
                'node_modules/@bigcommerce/storefront-data-hooks'
            ),
            '@leffot/form-controls': path.join(
                __dirname,
                'components',
                'form-controls'
            ),
            '@lib': path.join(__dirname, 'lib'),
            '@public': path.join(__dirname, 'public'),
        }

        return config
    },
    async headers() {
        return generateHeaders()
    },
    async redirects() {
        return await generateRedirects()
    },
    sentry: {
        // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
        // for client-side builds. (This will be the default starting in
        // `@sentry/nextjs` version 8.0.0.) See
        // https://webpack.js.org/configuration/devtool/ and
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
        // for more information.
        hideSourceMaps: true,
    },
}

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)

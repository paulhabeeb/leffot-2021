import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { DefaultSeo } from 'next-seo'
import { init } from '@socialgouv/matomo-next'

import { PrismicProvider } from '@prismicio/react'
import Client from '@lib/prismic'
import linkResolver from '@lib/link-resolver'

import '../styles/globals.scss'
import '../styles/root.scss'

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_ENV === 'production') {
            init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
        }
    }, [])

    return (
        <PrismicProvider
            client={Client}
            linkResolver={linkResolver}
            internalLinkComponent={({ href, children, ...props }) => (
                <Link href={href} {...props}>
                    {children}
                </Link>
            )}
            externalLinkComponent={props => <a {...props} />} // eslint-disable-line jsx-a11y/anchor-has-content
        >
            <DefaultSeo
                titleTemplate='%s - Leffot'
                defaultTitle='Leffot'
                openGraph={{
                    site_name: 'Leffot',
                }}
            />
            <Component {...pageProps} />
        </PrismicProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
}

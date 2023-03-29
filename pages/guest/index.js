import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { urls } from '@lib/data'
import getPageLayoutData from '@lib/queries/layout-props'

import { Base } from '@components/layout'
import { FindOrder } from '@components/guest'

export default function FindGuestOrderPage({ footer, header, siteBanner }) {
    const { query } = useRouter()
    const canonical = `${urls.baseUrl}/guest`
    const title = 'Guest Order Lookup'

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                canonical={canonical}
                description='Find your order details, even without an account.'
                title={title}
                openGraph={{
                    title,
                }}
            />
            <FindOrder showError={query?.noOrder === 'true'} />
        </Base>
    )
}

FindGuestOrderPage.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

export async function getStaticProps() {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()

        return {
            props: {
                footer,
                header,
                siteBanner,
            },
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

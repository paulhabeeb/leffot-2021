import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'
import getPageLayoutData from '@lib/queries/layout-props'

import { Base } from '@components/layout'
import { CheckBalance } from '@components/product'

export default function CheckBalancePage({ footer, header, siteBanner }) {
    const title = 'Check Gift Card Balance'

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                title={title}
                description='Check the balance of a Leffot gift card'
                openGraph={{
                    title,
                }}
            />
            <CheckBalance />
        </Base>
    )
}

CheckBalancePage.propTypes = {
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
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'

import getPageLayoutData from '@lib/queries/layout-props'

import { OrderConfirmation } from '@components/checkout'
import { Base } from '@components/layout'

export default function OrderConfirmationPage({
    footer,
    header,
    orderNumber,
    siteBanner,
}) {
    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo title='Thank you for your order' />
            <OrderConfirmation orderNumber={orderNumber} />
        </Base>
    )
}

OrderConfirmationPage.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    orderNumber: PropTypes.string,
    siteBanner: PropTypes.object,
}

export async function getServerSideProps({ params }) {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()

        return {
            props: {
                footer,
                header,
                orderNumber: params.id,
                siteBanner,
            },
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

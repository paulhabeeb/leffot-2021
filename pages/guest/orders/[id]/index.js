import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'
import decodeToken from '@lib/decode-token'
import getPageLayoutData from '@lib/queries/layout-props'
import getOrderData from '@lib/orders/get-order-data'

import { Base } from '@components/layout'
import { GuestOrder } from '@components/guest'

export default function GuestOrderPage({ footer, header, order, siteBanner }) {
    const title = `Order #${order.id}`

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo title={title} />
            <GuestOrder order={order} />
        </Base>
    )
}

GuestOrderPage.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    order: PropTypes.object,
    siteBanner: PropTypes.object,
}

export async function getServerSideProps({ params, req }) {
    try {
        const [[header, footer, siteBanner], order] = await Promise.all([
            getPageLayoutData(),
            getOrderData(params.id),
        ])

        // To look up a guest order, the user must supply the correct order number
        // and associated email address. Once they do, we hash those with JWT and
        // store them in a cookie. We decode that cookie here to make sure they match.
        const decodedToken = decodeToken(req?.cookies?.guest)

        // If the order ID and email match the ones that were submitted on the form
        // and encoded with JWT, then show the order. Otherwise (i.e., if a user just
        // goes directly to this page without successfully entering an order number and
        // email address) show nothing.
        if (
            decodedToken?.orderId !== params.id &&
            decodedToken?.email !== order?.billing_address?.email
        ) {
            throw 'Cannot find order or cookie does not match'
        }

        return {
            props: {
                footer,
                header,
                order,
                siteBanner,
            },
        }
    } catch (error) {
        Sentry.captureException(error)

        return {
            redirect: {
                destination: '/guest?noOrder=true',
                permanent: false,
            },
        }
    }
}

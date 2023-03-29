import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@framework/lib/session'
import withCustomer from '@lib/with-customer'

import getPageLayoutData from '@lib/queries/layout-props'
import getOrderData from '@lib/orders/get-order-data'

import { AccountBody } from '@components/account/common'
import { Order } from '@components/account'

export default function OrderPage({
    customer,
    footer,
    header,
    id,
    order,
    siteBanner,
}) {
    return (
        <AccountBody
            banner={siteBanner}
            customer={customer}
            footer={footer}
            header={header}
            title={`Order #${id}`}
        >
            <Order order={order} />
        </AccountBody>
    )
}

OrderPage.propTypes = {
    customer: PropTypes.object,
    footer: PropTypes.object,
    header: PropTypes.object,
    id: PropTypes.string,
    order: PropTypes.object,
    siteBanner: PropTypes.object,
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(props) {
        const callback = async customer => {
            const [[header, footer, siteBanner], orderData] = await Promise.all(
                [getPageLayoutData(), getOrderData(props.params.id)]
            )

            // Only show the order if it's for the logged-in customer
            const order =
                orderData?.customer_id === customer?.entityId ? orderData : null

            return {
                props: {
                    customer,
                    footer,
                    header,
                    id: props.params.id,
                    order,
                    siteBanner,
                },
            }
        }

        return await withCustomer(props, callback)
    },
    sessionOptions
)

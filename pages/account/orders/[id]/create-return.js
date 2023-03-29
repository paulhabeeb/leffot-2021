import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@framework/lib/session'
import withCustomer from '@lib/with-customer'

import getPageLayoutData from '@lib/queries/layout-props'
import getReturnOrder from '@lib/orders/get-return-order'

import { AccountBody } from '@components/account/common'
import { CreateReturn } from '@components/account'

export default function CreateReturnPage({
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
            title={`Create return for order #${id}`}
        >
            <CreateReturn id={id} order={order} />
        </AccountBody>
    )
}

CreateReturnPage.propTypes = {
    customer: PropTypes.object,
    footer: PropTypes.object,
    header: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.object,
    siteBanner: PropTypes.object,
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(props) {
        const callback = async customer => {
            const [[header, footer, siteBanner], orderData] = await Promise.all(
                [getPageLayoutData(), getReturnOrder(props.params.id)]
            )

            // Only show the return form if:
            // 1. A customer is logged in, and
            // 2. The order is for the logged-in customer
            const order =
                customer && orderData?.customer_id === customer?.entityId
                    ? orderData
                    : null

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

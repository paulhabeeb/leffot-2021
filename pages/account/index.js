import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@framework/lib/session'
import withCustomer from '@lib/with-customer'

import { queryAPI } from '@lib/api/bc-rest'
import getPageLayoutData from '@lib/queries/layout-props'

import { Orders } from '@components/account'
import { AccountBody } from '@components/account/common'

export default function AccountPage({
    customer,
    footer,
    header,
    orders,
    siteBanner,
}) {
    return (
        <AccountBody
            banner={siteBanner}
            customer={customer}
            footer={footer}
            header={header}
            title='Your Orders'
        >
            <Orders customerId={customer.entityId} initOrders={orders} />
        </AccountBody>
    )
}

AccountPage.propTypes = {
    customer: PropTypes.object,
    footer: PropTypes.object,
    header: PropTypes.object,
    orders: PropTypes.array,
    siteBanner: PropTypes.object,
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(props) {
        const callback = async customer => {
            const [[header, footer, siteBanner], orderData] = await Promise.all(
                [
                    getPageLayoutData(),
                    queryAPI({
                        path: `v2/orders?customer_id=${customer.entityId}&sort=id:desc&limit=30`,
                    }),
                ]
            )

            const orders = orderData.sort((a, b) => {
                if (a.id > b.id) {
                    return -1
                }

                if (a.id < b.id) {
                    return 1
                }

                return 0
            })

            return {
                props: {
                    customer,
                    footer,
                    header,
                    orders,
                    siteBanner,
                },
            }
        }

        return await withCustomer(props, callback)
    },
    sessionOptions
)

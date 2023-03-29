import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@framework/lib/session'
import withCustomer from '@lib/with-customer'

import getPageLayoutData from '@lib/queries/layout-props'

import { Settings } from '@components/account'
import { AccountBody } from '@components/account/common'

export default function SettingsPage({ customer, footer, header, siteBanner }) {
    return (
        <AccountBody
            banner={siteBanner}
            customer={customer}
            footer={footer}
            header={header}
            title='Account Settings'
        >
            <Settings customer={customer} />
        </AccountBody>
    )
}

SettingsPage.propTypes = {
    customer: PropTypes.object,
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(props) {
        const callback = async customer => {
            const [header, footer, siteBanner] = await getPageLayoutData()

            return {
                props: {
                    customer,
                    footer,
                    header,
                    siteBanner,
                },
            }
        }

        return await withCustomer(props, callback)
    },
    sessionOptions
)

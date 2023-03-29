import PropTypes from 'prop-types'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@framework/lib/session'
import withCustomer from '@lib/with-customer'

import getPageLayoutData from '@lib/queries/layout-props'

import { AddressBook } from '@components/account'
import { AccountBody } from '@components/account/common'

export default function AddressBookPage({
    customer,
    footer,
    header,
    siteBanner,
}) {
    return (
        <AccountBody
            banner={siteBanner}
            customer={customer}
            footer={footer}
            header={header}
            title='Address Book'
        >
            <AddressBook />
        </AccountBody>
    )
}

AddressBookPage.propTypes = {
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

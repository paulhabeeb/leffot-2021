import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@framework/lib/session'

import getLoggedInCustomer from '@lib/get-logged-in-customer'
import getPageLayoutData from '@lib/queries/layout-props'
import { urls } from '@lib/data'

import { Login } from '@components/account'
import { Base } from '@components/layout'

export default function LoginPage({ footer, header, siteBanner }) {
    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                title='Sign In'
                openGraph={{
                    title: 'Sign In',
                }}
            />
            <Login />
        </Base>
    )
}

LoginPage.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(props) {
        try {
            const [[header, footer, siteBanner], { data }] = await Promise.all([
                getPageLayoutData(),
                getLoggedInCustomer(props),
            ])

            // If the user is already logged in, redirect them to their account
            if (data) {
                return {
                    redirect: {
                        permanent: false,
                        destination: urls.account.index,
                    },
                }
            }

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
    },
    sessionOptions
)

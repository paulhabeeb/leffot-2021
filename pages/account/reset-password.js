import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'
import getPageLayoutData from '@lib/queries/layout-props'

import { ResetPassword } from '@components/account'
import { Base } from '@components/layout'

export default function ResetPasswordPage({ footer, header, siteBanner }) {
    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo title='Reset Password' />
            <ResetPassword />
        </Base>
    )
}

ResetPasswordPage.propTypes = {
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

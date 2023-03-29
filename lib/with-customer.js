import * as Sentry from '@sentry/nextjs'
import getLoggedInCustomer from '@lib/get-logged-in-customer'
import { urls } from '@lib/data'

export default async function withCustomer(props, callback) {
    try {
        const { data, errors } = await getLoggedInCustomer(props)

        if (errors) {
            return {
                redirect: {
                    permanent: false,
                    destination: urls.auth.login,
                },
            }
        }

        return await callback(data.customer)
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

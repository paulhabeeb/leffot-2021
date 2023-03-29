import * as Sentry from '@sentry/nextjs'
import { getConfig } from '@framework/api'
import { getLoggedInCustomerQuery } from '@framework/api/customers/handlers/get-logged-in-customer'

const getLoggedInCustomer = async ({ locale, req }) => {
    const noCustomer = {
        data: null,
        errors: [{ message: 'No customer or session', code: 'no_customer' }],
    }

    try {
        const session = req.session
        const config = getConfig({ locale })
        const token = session.token || req.cookies[config.customerCookie]
        const headers = session.token
            ? {
                  Authorization: `Bearer ${session.token}`,
                  'X-Bc-Customer-Id': session.customerId.toString(),
              }
            : {
                  cookie: `${config.customerCookie}=${token}`,
              }

        if (token) {
            const { data } = await config.fetch(
                getLoggedInCustomerQuery,
                undefined,
                { headers }
            )
            const { customer } = data

            if (!customer) {
                return {
                    data: null,
                    errors: [
                        { message: 'Customer not found', code: 'not_found' },
                    ],
                }
            }

            return { data: { customer }, errors: undefined }
        }

        return noCustomer
    } catch (error) {
        Sentry.captureException(error)
        return noCustomer
    }
}

export default getLoggedInCustomer

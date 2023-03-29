import { captureException } from '@sentry/nextjs'
const braintree = require('braintree')

export default async function handler(req, res) {
    try {
        const environment =
            process.env.NEXT_PUBLIC_ENV === 'production'
                ? braintree.Environment.Production
                : braintree.Environment.Sandbox

        const gateway = new braintree.BraintreeGateway({
            environment,
            merchantId: process.env.BRAINTREE_MERCHANT_ID,
            publicKey: process.env.BRAINTREE_PUBLIC_KEY,
            privateKey: process.env.BRAINTREE_PRIVATE_KEY,
        })

        const response = await gateway.clientToken.generate({
            // customerId: aCustomerId, // pass a customer id for vault stuff
        })

        res.status(200).send(response.clientToken)
    } catch (error) {
        captureException(error)

        res.status(400).json({ status: 'invalid request' })
    }
}

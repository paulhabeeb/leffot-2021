import * as Sentry from '@sentry/nextjs'
import jwt from 'jsonwebtoken'

export default function decodeToken(token) {
    try {
        const secret = process.env.BIGCOMMERCE_STORE_API_TOKEN
        const verified = jwt.verify(token, secret)

        return verified
    } catch (error) {
        Sentry.captureException(error)
        return null
    }
}

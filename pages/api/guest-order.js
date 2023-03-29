import { captureException } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'
import { setCookie as set } from '@lib/cookies'
import { queryAPI } from '@lib/api/bc-rest'

function getCookieValue({ email, orderId }) {
    const secret = process.env.BIGCOMMERCE_STORE_API_TOKEN
    const token = jwt.sign(
        {
            email,
            orderId,
        },
        secret,
        {
            expiresIn: '15m',
        }
    )

    return token
}

function setCookie({ email, orderId, res }) {
    const cookieValue = getCookieValue({ email, orderId })

    set({
        cookieName: 'guest',
        cookieValue,
        res,
    })
}

async function getOrder(orderId) {
    const data = await queryAPI({
        path: `v2/orders/${orderId}`,
    })

    return data
}

export default async function handler(req, res) {
    try {
        const { email, orderId } = req.query
        const order = await getOrder(orderId)

        if (email !== order?.billing_address?.email) {
            throw {
                status: 404,
                message: 'Error matching email!',
            }
        }

        setCookie({ email, orderId, res })

        return res.status(200).json({ message: 'success!' })
    } catch (error) {
        captureException(error)

        res.status(error.status).json({
            error: error.message,
        })
    }
}

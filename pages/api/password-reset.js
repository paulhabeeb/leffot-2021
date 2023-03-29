import { captureException } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'
import { queryAPI } from '@lib/api/bc-rest'
import fetchCustomer from '@lib/api/fetch-customer'
import { clearCookie, setCookie } from '@lib/cookies'

function getPasswordReset(req, res) {
    setCookie({
        cookieName: 'reset_token',
        cookieValue: req.query.token,
        res,
    })

    return res.redirect('/account/reset-password')
}

function decodePasswordResetToken(token) {
    try {
        const secret = process.env.BIGCOMMERCE_STORE_API_TOKEN
        const verified = jwt.verify(token, secret)

        return verified
    } catch (error) {
        captureException(error)

        throw {
            status: 500,
            message: 'This password reset link has expired.',
        }
    }
}

async function updateCustomer(customerData) {
    await queryAPI({
        path: 'v3/customers',
        method: 'PUT',
        body: [customerData],
    })
}

async function deleteCustomerAttribute(id) {
    await queryAPI({
        path: `v3/customers/attribute-values?id:in=${id}`,
        method: 'DELETE',
    })
}

async function postPasswordReset(req, res) {
    try {
        const newPassword = req.body.password
        const resetToken = req.cookies.reset_token
        const decodedToken = decodePasswordResetToken(resetToken)

        const customer = await fetchCustomer(decodedToken.email)
        const customerOtt = customer.attributes.find(
            attribute => attribute.attribute_id === 1
        )

        if (customerOtt.attribute_value !== decodedToken.ott) {
            throw {
                status: 403,
                message: 'Invalid password reset token.',
            }
        }

        await Promise.all([
            updateCustomer({
                id: decodedToken.id,
                authentication: {
                    new_password: newPassword,
                    force_password_reset: false, // Must set to false or BigCommerce will send out a password reset email that's useless
                },
            }),
            deleteCustomerAttribute(customerOtt.id),
        ])

        clearCookie({ cookieName: 'reset_token', res })

        res.status(200).send()
    } catch (error) {
        captureException(error)

        res.status(error.status).json(error)
    }
}

export default async function handler(req, res) {
    const methods = {
        GET: () => getPasswordReset(req, res),
        POST: () => postPasswordReset(req, res),
        UNSUPPORTED: () => res.status(405).send(),
    }

    const action = methods[req.method] || methods.UNSUPPORTED

    return action()
}

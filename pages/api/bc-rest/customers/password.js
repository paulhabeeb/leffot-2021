import * as Sentry from '@sentry/nextjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'
import { queryAPI } from '@lib/api/bc-rest'
import fetchCustomer from '@lib/api/fetch-customer'
import { urls } from '@lib/data'

async function sendEmail(customer, resetToken) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const passwordResetLink = `${urls.baseUrl}/api/password-reset?token=${resetToken}`
    const firstName = customer?.first_name || ''
    const lastName = customer?.last_name || ''

    const message = {
        to: {
            email: customer.email,
            name: `${firstName} ${lastName}`,
        },
        from: {
            email: 'info@leffot.com',
            name: 'Leffot',
        },
        templateId: 'd-be0ff4d368e74111a0e1be53f0226ccb',
        dynamicTemplateData: {
            subject: 'Password reset',
            reset_link: passwordResetLink,
        },
    }

    await sgMail.send(message)
}

function generatePasswordResetToken(customer, ott) {
    const secret = process.env.BIGCOMMERCE_STORE_API_TOKEN
    const token = jwt.sign(
        {
            email: customer.email,
            ott,
            id: customer.id,
        },
        secret,
        {
            expiresIn: '10m',
        }
    )

    return token
}

function sha256Hash(text) {
    const hash = crypto.createHash('sha256')
    hash.update(text)

    return hash.digest('hex')
}

async function upsertCustomerOTT(customer) {
    const path = 'v3/customers/attribute-values'
    const body = [
        {
            customer_id: customer.id,
            attribute_id: 1,
            value: sha256Hash(`${customer.email}${Date.now().toString()}`),
        },
    ]

    const { data } = await queryAPI({
        path,
        method: 'PUT',
        body,
    })

    return data[0].attribute_value
}

export default async function handler(req, res) {
    try {
        const customer = await fetchCustomer(req.body.email)
        const ott = await upsertCustomerOTT(customer)
        const jwtToken = generatePasswordResetToken(customer, ott)
        await sendEmail(customer, jwtToken)

        res.status(200).send()
    } catch (error) {
        Sentry.captureException(error)

        res.status(error?.status || 404).json({
            error: error?.message || '',
        })
    }
}

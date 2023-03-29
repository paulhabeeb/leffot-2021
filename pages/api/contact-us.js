import { captureException } from '@sentry/nextjs'
import sgMail from '@sendgrid/mail'

export default async function handler(req, res) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const { email, message, name } = req.body

        await sgMail.send({
            to: {
                email: 'info@leffot.com',
                name: 'Leffot',
            },
            from: {
                email,
                name,
            },
            subject: 'New contact form submission on leffot.com',
            text: message,
        })

        return res.status(200).json({ message: 'success!' })
    } catch (error) {
        captureException(error)

        res.status(error.status).json({
            error: 'Error submitting contact form',
        })
    }
}

import { captureException } from '@sentry/nextjs'
import mailchimp from '@mailchimp/mailchimp_marketing'
import crypto from 'crypto'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
})

export default async function handler(req, res) {
    try {
        const list_id = process.env.MAILCHIMP_LIST_ID
        const subscriber_hash = crypto
            .createHash('md5')
            .update(req.body.email_address.toLowerCase())
            .digest('hex')

        await mailchimp.lists.setListMember(list_id, subscriber_hash, req.body)

        return res.status(200).json({ message: 'success' })
    } catch (error) {
        captureException(error)

        res.status(error?.status || 500).json({
            error: 'Error submitting contact form',
        })
    }
}

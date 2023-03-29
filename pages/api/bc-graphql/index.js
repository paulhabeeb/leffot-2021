import { captureException } from '@sentry/nextjs'
import queryGraphqlAPI from '@lib/api/bc-graphql'

export default async function handler(req, res) {
    try {
        const data = await queryGraphqlAPI(req.body)

        res.status(200).json(data)
    } catch (error) {
        captureException(error)

        res.status(error.status).json({
            error: error.message,
        })
    }
}

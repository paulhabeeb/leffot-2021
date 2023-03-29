import { captureException } from '@sentry/nextjs'
import * as url from 'url'

// Change host appropriately if you run your own Sentry instance.
const sentryHost = 'o998506.ingest.sentry.io'

// Set knownProjectIds to an array with your Sentry project IDs which you
// want to accept through this proxy.
const knownProjectIds = ['5957349']

export default async function handler(req, res) {
    try {
        const envelope = req.body
        const pieces = envelope.split('\n')

        const header = JSON.parse(pieces[0])

        const { host, path } = url.parse(header.dsn)

        if (host !== sentryHost) {
            throw new Error(`invalid host: ${host}`)
        }

        const projectId = path.replace(/\//g, '')
        if (!knownProjectIds.includes(projectId)) {
            throw new Error(`invalid project id: ${projectId}`)
        }

        const endpoint = `https://${sentryHost}/api/${projectId}/envelope/`
        const response = await fetch(endpoint, {
            method: 'POST',
            body: envelope,
        })

        const json = response.json()

        res.status(200).json(json)
    } catch (error) {
        captureException(error)

        res.status(400).json({ status: 'invalid request' })
    }
}

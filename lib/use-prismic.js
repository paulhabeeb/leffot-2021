import * as Sentry from '@sentry/nextjs'
import useSWR from 'swr'
import { querySingle } from '@lib/queries/prismic'

const fetcher = async path => {
    try {
        const { data } = await querySingle({ slug: path })

        return data
    } catch (error) {
        Sentry.captureException(error)
        return error
    }
}

export default function usePrismic(path) {
    const { data, error } = useSWR(path, fetcher, {
        refreshInterval: 30000, // Check for new data every 30 seconds
    })

    return {
        data,
        error,
    }
}

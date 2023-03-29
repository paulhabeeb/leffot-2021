import * as Sentry from '@sentry/nextjs'
import { queryAllEvents, queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { Events } from '@components/events'

export default function Home(props) {
    return <Events {...props} />
}

export async function getStaticProps() {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()
        const [eventPage, events] = await Promise.all([
            queryByUID('events', 'events'),
            queryAllEvents(),
        ])

        let callout = null
        if (eventPage.data.show_callout && eventPage.data?.callout?.uid) {
            const { type, uid } = eventPage.data.callout
            let calloutData = await queryByUID(uid, type)

            // Sometimes when there's no background image, Prismic will return an array
            // with one value inside, except the value will have no data. That throws
            // everything else off, so we should check to see if that's what's happening
            // and instead set the image to null, if so.
            if (
                calloutData.data.background_images.length === 1 &&
                Object.keys(
                    calloutData.data.background_images[0].background_image
                ).length === 0
            ) {
                calloutData.data.background_images = null
            }

            callout = calloutData.data
        }

        return {
            props: {
                callout,
                eventPage: eventPage.data,
                events,
                footer,
                header,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

import * as Sentry from '@sentry/nextjs'
import { queryAllOfType, queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'
import getGallery from '@lib/brand/get-gallery'

import { Event } from '@components/event'

export default function EventPage(props) {
    return <Event {...props} />
}

export async function getStaticProps({ params }) {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()
        const page = await queryByUID(params.uid, 'event', {
            fetchLinks: ['brand.gallery'],
        })
        const gallery = await getGallery(page?.data?.brand?.data?.gallery)

        return {
            props: {
                footer,
                gallery,
                header,
                page,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

export async function getStaticPaths() {
    const docs = await queryAllOfType('event')

    return {
        paths: docs.map(doc => {
            return { params: { uid: doc.uid } }
        }),
        fallback: 'blocking',
    }
}

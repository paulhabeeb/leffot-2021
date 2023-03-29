import * as Sentry from '@sentry/nextjs'
import { queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { Sizing } from '@components/sizing'

export default function SizingPage(props) {
    return <Sizing {...props} />
}

export async function getStaticProps() {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()
        const page = await queryByUID('sizing', 'size_guide')

        return {
            props: {
                footer,
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

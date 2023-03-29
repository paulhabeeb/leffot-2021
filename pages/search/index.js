import * as Sentry from '@sentry/nextjs'
import getPageLayoutData from '@lib/queries/layout-props'
import { queryByUID } from '@lib/queries/prismic'

import { Search } from '@components/search'

export default function SearchPage(props) {
    return <Search {...props} />
}

export async function getStaticProps() {
    try {
        const [[header, footer, siteBanner], page] = await Promise.all([
            await getPageLayoutData(),
            await queryByUID('search', 'search'),
        ])

        return {
            props: {
                footer,
                header,
                page: page.data,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

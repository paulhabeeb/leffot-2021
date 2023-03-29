import * as Sentry from '@sentry/nextjs'
import { queryByType } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { Journal } from '@components/journal'

export default function JournalPage(props) {
    return <Journal {...props} />
}

export async function getStaticProps() {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()
        const posts = await queryByType('blog_post', {
            orderings: {
                field: 'my.blog_post.date_published',
                direction: 'desc',
            },
            page: 1,
            pageSize: 20,
        })

        return {
            props: {
                footer,
                header,
                posts,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

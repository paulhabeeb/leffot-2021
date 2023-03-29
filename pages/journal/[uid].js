import * as Sentry from '@sentry/nextjs'
import { queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { JournalPost } from '@components/journal'

export default function JournalPostPage(props) {
    return <JournalPost {...props} />
}

// Uncomment revalidate and getStaticPaths if/when you switch back to getStaticProps
// You can probably generate the first page or two of posts, then let the rest
// use fallback: blocking.
export async function getServerSideProps({ params }) {
    try {
        const [[header, footer, siteBanner], post] = await Promise.all([
            getPageLayoutData(),
            queryByUID(params.uid, 'blog_post'),
        ])

        return {
            props: {
                footer,
                header,
                post,
                siteBanner,
            },
            // revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

// export async function getStaticPaths() {
//     const docs = await queryAllOfType('blog_post')
//
//     return {
//         paths: docs.map(doc => `/journal/${doc.uid}`),
//         fallback: 'blocking',
//     }
// }

import * as Sentry from '@sentry/nextjs'
import getCategoryData from '@lib/queries/category-props'

import { Category } from '@components/category'

export default function CategoryPage(props) {
    return <Category {...props} />
}

export async function getStaticProps({ locale, previewData = {} }) {
    try {
        const categoryData = await getCategoryData({
            locale,
            ref: previewData.ref,
            slug: 'sale',
        })

        return categoryData
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

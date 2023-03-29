import getCategoryData from '@lib/queries/category-props'
import { queryByUID } from '@lib/queries/prismic'
import { urls } from '@lib/data'

import { Category } from '@components/category'

export default function CategoryPage(props) {
    return <Category {...props} />
}

export async function getStaticProps({ locale, params, previewData = {} }) {
    const categoryData = await getCategoryData({
        locale,
        ref: previewData.ref,
        slug: `pre-owned/brands/${params.slug}`,
    })

    return categoryData
}

export async function getStaticPaths() {
    const categories = await queryByUID('pre-owned', 'mm_secs')
    const paths = []

    const addPath = slug => {
        return { params: { slug } }
    }

    categories.data.body.forEach(section => {
        if (
            section.slice_type === 'links' &&
            section.primary.group_label === 'Brands'
        ) {
            section.items.forEach(item => {
                const url = item.link.url
                    .replace(urls.baseUrl, '')
                    .replace('/pre-owned/brands/', '')
                    .replace('/', '')
                paths.push(addPath(url))
            })
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

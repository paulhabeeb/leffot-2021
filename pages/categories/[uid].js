import getCategoryData from '@lib/queries/category-props'
import { queryByUID } from '@lib/queries/prismic'

import { Category } from '@components/category'

export default function CategoryPage(props) {
    return <Category {...props} />
}

export async function getStaticProps({ locale, params, previewData = {} }) {
    const categoryData = await getCategoryData({
        basePath: '/categories/',
        locale,
        ref: previewData.ref,
        slug: params.uid,
    })

    return categoryData
}

export async function getStaticPaths() {
    const categories = await queryByUID('categories-mega-menu', 'mega_menu')
    const paths = []

    const addPath = uid => {
        return { params: { uid } }
    }

    categories.data.body.forEach(category => {
        paths.push(addPath(category.primary.link.slug))

        if (category.items[0].subcategory_label !== null) {
            category.items.forEach(subCategory => {
                paths.push(addPath(subCategory.subcategory_link.uid))
            })
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

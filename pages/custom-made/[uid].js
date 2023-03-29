import getCategoryData from '@lib/queries/category-props'
import { queryAllOfType } from '@lib/queries/prismic'

import { Category } from '@components/category'

export default function CustomMadePage(props) {
    return <Category {...props} />
}

export async function getStaticProps({ locale, params, previewData = {} }) {
    const categoryData = await getCategoryData({
        basePath: '/custom-made/',
        locale,
        queryType: 'custom_made_brand',
        ref: previewData.ref,
        slug: params.uid,
    })

    return categoryData
}

export async function getStaticPaths() {
    const brands = await queryAllOfType('brand')
    const paths = []

    const addPath = uid => {
        return { params: { uid } }
    }

    brands.forEach(brand => {
        const tabs = brand.data.tab

        if (tabs.length > 0 && tabs.some(e => e.tab_label === 'Custom Made')) {
            paths.push(addPath(brand.uid))
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

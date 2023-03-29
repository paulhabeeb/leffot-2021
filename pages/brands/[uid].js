import getCategoryData from '@lib/queries/category-props'
import { queryAllOfType } from '@lib/queries/prismic'

import { Category } from '@components/category'

export default function BrandPage(props) {
    return <Category {...props} />
}

export async function getStaticProps({ locale, params, previewData = {} }) {
    const categoryData = await getCategoryData({
        basePath: '/brands/',
        locale,
        queryType: 'brand',
        ref: previewData.ref,
        slug: params.uid,
    })

    return categoryData
}

export async function getStaticPaths() {
    const brands = await queryAllOfType('brand')

    return {
        paths: brands.map(brand => {
            return { params: { uid: brand.uid } }
        }),
        fallback: 'blocking',
    }
}

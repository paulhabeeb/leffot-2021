import getCategoryData from '@lib/queries/category-props'

import { Category } from '@components/category'

export default function CategoryPage(props) {
    return <Category {...props} />
}

export async function getStaticProps({ locale, previewData = {} }) {
    const categoryData = await getCategoryData({
        locale,
        ref: previewData.ref,
        slug: 'new',
    })

    return categoryData
}

import getProductProps from '@lib/queries/product-props'
import getProductPaths from '@lib/queries/product-paths'

import { Product } from '@components/product'

const path = '/products'

export default function ProductPage(props) {
    return <Product {...props} />
}

export async function getStaticProps({
    params,
    locale,
    preview,
    previewData = {},
}) {
    const productData = await getProductProps(
        path,
        params,
        locale,
        preview,
        previewData.ref
    )

    return productData
}

export async function getStaticPaths() {
    const productPaths = await getProductPaths(path)

    return productPaths
}

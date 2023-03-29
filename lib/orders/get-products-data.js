import { queryAPI } from '@lib/api/bc-rest'
import { formatProductTitle } from '@lib/products/restructure-data'

export default async function getProductsData({ productsData }) {
    const products = []

    if (productsData !== null) {
        // We need to put all the product IDs in a string to request the extended data
        // (primary image, custom fields) from the BC API.
        const idString = productsData
            .map(product => product.product_id)
            .toString()
        const [{ data: extendedProductsData }] = await Promise.all([
            queryAPI({
                path: `v3/catalog/products?include=primary_image,custom_fields&id:in=${idString}`,
            }),
        ])

        for (let i = 0; i < productsData.length; i++) {
            const name = formatProductTitle(productsData[i].name)
            const extended = extendedProductsData.find(
                prod => prod.id === productsData[i].product_id
            )
            const image = extended?.primary_image || null
            const fields = extended?.custom_fields || null
            const availability = extended?.availability || null
            const originalPrice = extended?.price || null

            products.push({
                ...productsData[i],
                availability,
                fields,
                image,
                name,
                originalPrice,
            })
        }
    }

    return products
}

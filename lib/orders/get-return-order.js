import { queryAPI } from '@lib/api/bc-rest'
import formatOrderDate from '@lib/format-order-date'
import findReturn from '@lib/orders/find-return'
import getReturnableItems from '@lib/orders/get-returnable-items'
import getProductsData from '@lib/orders/get-products-data'

export default async function getReturnOrder(orderId) {
    const [orderData, rawProducts, shipments, returns] = await Promise.all([
        queryAPI({ path: `v2/orders/${orderId}` }),
        queryAPI({ path: `v2/orders/${orderId}/products` }),
        queryAPI({ path: `v2/orders/${orderId}/shipments` }),
        findReturn(parseInt(orderId)),
    ])

    const productsData = await getProductsData({
        productsData: rawProducts,
    })

    const returnableItems = getReturnableItems({
        productsData,
        returns,
        shipments,
    })

    let order = null

    // Show the return form only if there are returnable items
    if (returnableItems.length > 0) {
        const products = productsData.filter(product =>
            returnableItems.find(
                returnable => returnable.order_product_id === product.id
            )
        )

        order = {
            ...orderData,
            date_created: formatOrderDate(orderData.date_created),
            products,
            shipments,
        }
    }

    return order
}

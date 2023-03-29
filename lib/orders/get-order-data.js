import { queryAPI } from '@lib/api/bc-rest'
import formatOrderDate from '@lib/format-order-date'
import findReturn from '@lib/orders/find-return'
import getProductsData from '@lib/orders/get-products-data'
import getReturnableItems from '@lib/orders/get-returnable-items'
import getReturnedItems from '@lib/orders/get-returned-items'

export default async function getOrderData(orderId) {
    const [orderData, rawProducts, shipping_addresses, shipments, returns] =
        await Promise.all([
            queryAPI({ path: `v2/orders/${orderId}` }),
            queryAPI({ path: `v2/orders/${orderId}/products` }),
            queryAPI({ path: `v2/orders/${orderId}/shipping_addresses` }),
            queryAPI({ path: `v2/orders/${orderId}/shipments` }),
            findReturn(parseInt(orderId)),
        ])

    const products = await getProductsData({
        productsData: rawProducts,
    })

    const returnableItems = getReturnableItems({
        productsData: products,
        returns,
        shipments,
    })

    const rawReturnedItems = getReturnedItems(returns)
    const returnedItems = rawReturnedItems.map(item => {
        const fullProduct = products.find(
            product => product.id === item.product_id
        )

        return { ...fullProduct, ...item }
    })

    return {
        ...orderData,
        date_created: formatOrderDate(orderData.date_created),
        products,
        returnableItems,
        returnedItems,
        shipping_addresses,
        shipments,
    }
}

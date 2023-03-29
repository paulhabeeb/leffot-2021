import getReturnedItems from './get-returned-items'

function isWithinAllowedReturnTimeframe(shipDate) {
    const then = new Date(shipDate)
    const now = new Date()

    const msBetweenDates = Math.abs(then.getTime() - now.getTime())
    const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000)

    // If the shipment was made in the last 30 days, then the products in it
    // can be returned. Our return policy actually allows for returns within 10
    // days of receipt, but because we can't know exactly when the package was
    // delivered, we allow this extra wiggle room.
    return daysBetweenDates < 1330
}

function verifyShipments(shipments) {
    let products = []

    // If the order has shipments then there'll be something to return
    if (shipments?.length > 0) {
        // Dig into the array of shipments to grab all the products from each shipment
        // and make a single array from them.
        shipments.forEach(shipment => {
            const canReturn = isWithinAllowedReturnTimeframe(
                shipment.date_created
            )

            if (canReturn) {
                products = [...products, ...shipment.items]
            }
        })
    }

    return products
}

function verifyReturns({ shippedProducts, returns }) {
    let products = [...shippedProducts]

    // If the order has a metafield for returned items, then we want to
    // exclude the already-returned items from the array of returnable items
    if (returns.length > 0 && products.length > 0) {
        const returnedItems = getReturnedItems(returns)

        returnedItems.forEach(returned => {
            const shippedIndex = products.findIndex(
                shipped => shipped.order_product_id === returned.product_id
            )

            if (products[shippedIndex].quantity === returned.quantity) {
                products.splice(shippedIndex, 1)
            } else {
                products[shippedIndex].quantity =
                    products[shippedIndex].quantity - 1
            }
        })
    }

    return products
}

function verifyFinalSale({ productsData, unreturnedProducts }) {
    const products = []

    unreturnedProducts.forEach(product => {
        const productData = productsData.find(
            prod => prod.id === product.order_product_id
        )

        const basePrice = parseFloat(productData.originalPrice)
        const salePrice = parseFloat(productData.base_price)

        const isArchiveColl =
            productData?.fields?.archive_collection?.value === 'Yes'
        const isPreorder =
            productData?.availability === 'preorder' ||
            productData?.fields?.product_type?.value === 'Pre-order'
        const hasDiscount = productData.applied_discounts.length > 0
        const isGiftCard = productData.type === 'giftcertificate'
        const isOnSale = basePrice > salePrice

        if (
            !isArchiveColl &&
            !hasDiscount &&
            !isGiftCard &&
            !isPreorder &&
            !isOnSale
        ) {
            products.push(product)
        }
    })

    return products
}

export default function getReturnableItems({
    productsData,
    returns,
    shipments,
}) {
    const shippedProducts = verifyShipments(shipments)
    const unreturnedProducts = verifyReturns({ returns, shippedProducts })
    const products = verifyFinalSale({ productsData, unreturnedProducts })

    return products
}

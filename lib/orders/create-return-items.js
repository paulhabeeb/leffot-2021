function createReturnItem({ item, itemId, order, returnId }) {
    const { name, price_inc_tax, product_options, sku } = order.products.find(
        item => item.id === parseInt(itemId)
    )
    const credit_amount =
        item.return_action === 'Store Credit' ? parseFloat(price_inc_tax) : 0
    const refund_amount =
        item.return_action === 'Refund' ? parseFloat(price_inc_tax) : 0
    let item_options = ''
    product_options.forEach(option => {
        item_options += `${option.display_name_customer}: ${option.display_value_customer}\n`
    })

    return {
        credit_amount,
        item_options,
        name,
        outcome: item.return_action,
        product_id: parseInt(itemId),
        quantity: parseInt(item.return_qty),
        reason: item.return_reason,
        refund_amount,
        return_id: returnId,
        sku,
    }
}

export default function createReturnItems({ items, order, returnId }) {
    const returnItems = []

    Object.entries(items).forEach(([key, value]) => {
        if (parseInt(value.return_qty) > 0) {
            returnItems.push(
                createReturnItem({
                    item: value,
                    itemId: key,
                    order,
                    returnId,
                })
            )
        }
    })

    return returnItems
}

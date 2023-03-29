export default function convertLineItems(items) {
    return (
        items?.map(item => {
            return {
                item_id: item.id,
                quantity: item.quantity,
            }
        }) || []
    )
}

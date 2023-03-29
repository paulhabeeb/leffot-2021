export default function getReturnedItems(returns) {
    const returnedItems = []

    returns.forEach(ret => {
        returnedItems.push(...ret.return_items)
    })

    return returnedItems
}

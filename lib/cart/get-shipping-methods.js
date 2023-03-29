import axios from 'axios'
import convertLineItems from './convert-line-items'

export default async function getShippingMethods({
    address,
    cartId,
    lineItems,
}) {
    const line_items = convertLineItems(lineItems)

    const { data } = await axios({
        url: `/api/bc-rest/checkouts/${cartId}/consignments`,
        method: 'POST',
        data: [
            {
                address,
                line_items,
            },
        ],
        params: {
            include: 'consignments.available_shipping_options',
        },
    })

    const canShip =
        data?.data?.consignments?.[0]?.available_shipping_options?.length > 0

    return canShip ? data?.data?.consignments?.[0] : null
}

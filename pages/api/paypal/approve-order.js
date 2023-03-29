import { captureException } from '@sentry/nextjs'
import axios from 'axios'

import { queryAPI } from '@lib/api/bc-rest'
import generateAccessToken from '@lib/api/paypal/generate-access-token'
import convertLineItems from '@lib/cart/convert-line-items'
import matchShippingMethods from '@lib/cart/match-shipping-methods'

function getAddress({ email, purchase_units }) {
    const {
        address_line_1,
        address_line_2,
        admin_area_1,
        admin_area_2,
        country_code,
        postal_code,
    } = purchase_units[0].shipping.address

    const { full_name } = purchase_units[0].shipping.name
    const lastSpace = full_name.lastIndexOf(' ')
    const first_name = full_name.slice(0, lastSpace)
    const last_name = full_name.slice(lastSpace + 1)

    return {
        first_name,
        last_name,
        email,
        address1: address_line_1,
        address2: address_line_2,
        city: admin_area_2,
        state_or_province_code: admin_area_1,
        postal_code: postal_code,
        country_code: country_code,
    }
}

// Approve the PayPal transaction and capture funds
async function approvePayPalTransaction(orderId) {
    const accessToken = await generateAccessToken()
    const url = `${process.env.PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`

    return await axios({
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            Prefer: 'return=representation',
        },
    })
}

async function createBigCommerceOrder(paypalData, { cartId, items }) {
    const { id, payer, purchase_units } = paypalData
    const address = getAddress({
        email: payer.email_address,
        purchase_units,
    })

    // Add a billing address to the cart
    await queryAPI({
        method: 'POST',
        path: `v3/checkouts/${cartId}/billing-address`,
        body: { ...address },
    })

    // Create a consignment from the cart
    const consignmentUpdate = await queryAPI({
        method: 'POST',
        path: `v3/checkouts/${cartId}/consignments?include=consignments.available_shipping_options`,
        body: [
            {
                shipping_address: address,
                line_items: convertLineItems(items),
            },
        ],
    })

    // Find the shipping method the user selected
    const { cart, consignments } = consignmentUpdate?.data || null
    const { available_shipping_options, id: shipId } = consignments?.[0] || null

    const { selectedMethodId } = matchShippingMethods(
        available_shipping_options,
        purchase_units[0].shipping.options[0].id,
        cart?.currency?.code
    )

    // Update the consignment with the selected shipping method
    await queryAPI({
        method: 'PUT',
        path: `v3/checkouts/${cartId}/consignments/${shipId}`,
        body: { shipping_option_id: selectedMethodId },
    })

    // Create an order from the cart
    const {
        data: { id: bcOrderId },
    } = await queryAPI({
        method: 'POST',
        path: `v3/checkouts/${cartId}/orders`,
    })

    // Update order
    return await queryAPI({
        body: {
            payment_method: 'PayPal',
            payment_provider_id: id,
            status_id: 11, // 11 means awaiting fulfillment
        },
        method: 'PUT',
        path: `v2/orders/${bcOrderId}`,
    })
}

export default async function handler(req, res) {
    try {
        const { data } = await approvePayPalTransaction(req.body.orderId)
        const bcData = await createBigCommerceOrder(data, req.body)

        // Need to be able to cancel PayPal order if BC fails,
        // and need to update PayPal order with BC ID

        res.status(200).send(bcData)
    } catch (error) {
        captureException(error)

        res.status(400).json({ status: 'invalid request' })
    }
}

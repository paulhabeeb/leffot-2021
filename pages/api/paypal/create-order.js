import { captureException } from '@sentry/nextjs'
import axios from 'axios'

import generateAccessToken from '@lib/api/paypal/generate-access-token'

function getLineItems(items, currencyCode) {
    return items.map(item => {
        const { list_price, name, quantity, sku } = item

        return {
            description: sku,
            name,
            quantity,
            unit_amount: {
                currency_code: currencyCode,
                value: list_price,
            },
        }
    })
}

async function createPayPalOrder({
    amountToPay,
    currencyCode,
    items,
    itemsTotal,
    shippingOptions,
    taxTotal,
}) {
    const accessToken = await generateAccessToken()
    const url = `${process.env.PAYPAL_URL}/v2/checkout/orders`

    return await axios({
        method: 'POST',
        url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
        },
        data: {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: currencyCode,
                        value: amountToPay,
                        breakdown: {
                            item_total: {
                                currency_code: currencyCode,
                                value: itemsTotal,
                            },
                            tax_total: {
                                currency_code: currencyCode,
                                value: taxTotal,
                            },
                        },
                    },
                    items,
                    shipping: {
                        options: shippingOptions,
                    },
                },
            ],
        },
    })
}

export default async function handler(req, res) {
    try {
        const paypalItems = getLineItems(req.body.items, req.body.currencyCode)
        const { data } = await createPayPalOrder({
            ...req.body,
            items: paypalItems,
        })

        res.status(200).send(data)
    } catch (error) {
        captureException(error)

        res.status(400).json({ status: 'invalid request' })
    }
}

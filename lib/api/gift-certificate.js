import * as Sentry from '@sentry/nextjs'
import getCustomerId from '@framework/api/operations/get-customer-id'
import createApiHandler from '@framework/api/utils/create-api-handler'
import getCartCookie from '@framework/api/utils/get-cart-cookie'

// Return current cart info
const addGiftCertificate = async ({
    res,
    req,
    body: { cartId, locale, item },
    config,
}) => {
    if (!item) {
        return res.status(400).json({
            data: null,
            errors: [{ message: 'Missing gift certificate item' }],
        })
    }

    const { cookies } = req
    const customerToken = cookies[config.customerCookie]
    const customerId =
        customerToken && (await getCustomerId({ customerToken, config }))

    // Use a dummy base as we only care about the relative path
    const url = new URL(
        cartId ? `/v3/carts/${cartId}/items` : '/v3/carts',
        'http://a'
    )

    const options = {
        method: 'POST',
        body: JSON.stringify({
            customer_id: customerId,
            ...item,
            ...(!cartId && config.storeChannelId
                ? { channel_id: config.storeChannelId }
                : {}),
            ...(!cartId ? { locale } : {}),
        }),
    }
    const { data } = await config.storeApiFetch(
        url.pathname + url.search,
        options
    )

    // Create or update the cart cookie
    res.setHeader(
        'Set-Cookie',
        getCartCookie(config.cartCookie, data.id, config.cartCookieMaxAge)
    )
    res.status(200).json({ data })
}

const cartApi = async (req, res, config, handlers) => {
    const { cookies } = req
    const cartId = cookies[config.cartCookie]
    const include =
        typeof req.query.include === 'string' ? req.query.include : undefined

    try {
        // Create or add an item to the cart
        if (req.method === 'POST') {
            const body = { ...req.body, cartId, include }
            return await handlers['addGiftCertificate']({
                req,
                res,
                config,
                body,
            })
        }
    } catch (error) {
        Sentry.captureException(error)

        const message = error
            ? 'An unexpected error ocurred with the Bigcommerce API'
            : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message }] })
    }
}

export const handlers = { addGiftCertificate }

export default createApiHandler(cartApi, handlers, {})

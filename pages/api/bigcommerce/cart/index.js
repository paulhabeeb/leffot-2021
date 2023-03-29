import { captureException } from '@sentry/nextjs'
import cartApi from '@framework/api/cart'
import getCartCookie from '@framework/api/utils/get-cart-cookie'
import { parseCartItem } from '@framework/api/utils/parse-item'

export default cartApi({
    operations: {
        getCart: async ({ res, body: { cartId, include }, config }) => {
            let result = {}

            if (cartId) {
                try {
                    // Use a dummy base as we only care about the relative path
                    const url = new URL(`/v3/checkouts/${cartId}`, 'http://a')
                    if (include) {
                        url.searchParams.set('include', include)
                    }

                    result = await config.storeApiFetch(
                        url.pathname + url.search
                    )

                    result = {
                        ...result.data.cart,
                        ...result.data,
                    }

                    delete result.cart
                } catch (error) {
                    captureException(error)

                    if (error.status === 404) {
                        // Remove the cookie if it exists but the cart wasn't found
                        res.setHeader(
                            'Set-Cookie',
                            getCartCookie(config.cartCookie)
                        )
                    } else {
                        throw error
                    }
                }
            }

            res.status(200).json({ data: result ?? null })
        },
        updateItem: async ({ res, body, config }) => {
            const { cartId, itemId, item, include } = body

            if (!cartId || !itemId || !item) {
                return res.status(400).json({
                    data: null,
                    errors: [{ message: 'Invalid request' }],
                })
            }

            // Use a dummy base as we only care about the relative path
            const url = new URL(
                `/v3/carts/${cartId}/items/${itemId}`,
                'http://a'
            )
            if (include) {
                url.searchParams.set('include', include)
            }

            try {
                const lineItem = parseCartItem(item)
                const reqBody = JSON.stringify({
                    line_item: lineItem,
                })

                const { data } = await config.storeApiFetch(
                    url.pathname + url.search,
                    {
                        method: 'PUT',
                        body: reqBody,
                    }
                )

                // Update the cart cookie
                res.setHeader(
                    'Set-Cookie',
                    getCartCookie(
                        config.cartCookie,
                        cartId,
                        config.cartCookieMaxAge
                    )
                )
                return res.status(200).json({ data })
            } catch (error) {
                captureException(error)

                const errorJson = JSON.parse(error.data)

                return res.status(500).json({
                    data: null,
                    errors: [{ message: errorJson.title }],
                })
            }
        },
    },
})

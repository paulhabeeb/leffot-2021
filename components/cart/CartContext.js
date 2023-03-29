import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Script from 'next/script'
import { captureException } from '@sentry/nextjs'
import axios from 'axios'
import { applePay, client } from 'braintree-web'
import useCart from '@framework/cart/use-cart'

import { CART_PRODUCT_QUERY } from '@lib/queries/product-info'
import restructureProductData from '@lib/products/restructure-data'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export default function CartContextProvider({ children }) {
    const { data, error, isEmpty, revalidate } = useCart({
        include: [
            'cart.line_items.physical_items.options',
            'cart.line_items.digital_items.options',
            'redirect_urls',
        ],
    })

    const [cart, setCart] = useState({ data, error, isEmpty })
    const [products, setProducts] = useState(null)
    const [paypalIsLoading, setPaypalIsLoading] = useState(true)
    const [braintreeIsLoading, setBraintreeIsLoading] = useState(true)
    const [applePayInstance, setApplePayInstance] = useState(null)

    // Initialize cart items and update them when new data comes through
    useEffect(() => {
        const flattenProductsObject = prods => {
            const items = []

            if (prods) {
                Object.entries(prods).forEach(([type, array]) => {
                    array.forEach(item => {
                        items.push({
                            ...item,
                            type: type.slice(0, -1),
                        })
                    })
                })
            }

            return items
        }

        const productFetcher = async productIds => {
            try {
                const { data } = await axios('/api/bc-graphql', {
                    method: 'POST',
                    data: {
                        query: CART_PRODUCT_QUERY,
                        variables: { productIds },
                    },
                })

                return data.data.site.products.edges
            } catch (error) {
                setCart({
                    data: null,
                    error: 'There was an error fetching your cart. Please try again later.',
                    isEmpty: false,
                })
                captureException(error)
            }
        }

        const setCartProducts = async rawProducts => {
            const ids = rawProducts.physical_items.map(
                product => product.product_id
            )

            const productDetails = await productFetcher(ids)
            const restructuredProducts = productDetails.map(product =>
                restructureProductData(product.node)
            )

            const physicalProducts = rawProducts.physical_items.map(product => {
                let newItem = { ...product }

                restructuredProducts.forEach(detailedItem => {
                    if (detailedItem.entityId === product.product_id) {
                        newItem = {
                            ...newItem,
                            ...detailedItem,
                        }
                    }
                })

                return newItem
            })

            const newProducts = {
                ...rawProducts,
                physical_items: [...physicalProducts],
            }

            const productsArray = flattenProductsObject(newProducts)

            setProducts(productsArray)
        }

        if (data) {
            setCartProducts(data.line_items)
        }

        setCart({
            data,
            error,
            isEmpty,
        })
    }, [data, error, isEmpty])

    // Initialize Braintree for the Apple Pay button in the cart. We init
    // PayPal separately because the Braintree SDK doesn't let you update
    // shipping methods when the user selects a new shipping address.
    useEffect(() => {
        const initBraintree = async () => {
            try {
                const { data: authorization } = await axios.get(
                    '/api/braintree'
                )

                const clientInstance = await client.create({
                    authorization,
                })

                if (
                    window.ApplePaySession &&
                    ApplePaySession.supportsVersion(3) && // eslint-disable-line no-undef
                    ApplePaySession.canMakePayments() // eslint-disable-line no-undef
                ) {
                    const apInstance = await applePay.create({
                        client: clientInstance,
                    })

                    setApplePayInstance(apInstance)
                }

                setBraintreeIsLoading(false)
            } catch (error) {
                captureException(error)
            }
        }

        initBraintree()
    }, [])

    return (
        <CartContext.Provider
            value={{
                applePayInstance,
                braintreeIsLoading,
                cart,
                paypalIsLoading,
                products,
                revalidateCart: revalidate,
            }}
        >
            <Script
                id='paypal-sdk'
                src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
                strategy='beforeInteractive'
                onLoad={() => setPaypalIsLoading(false)}
            />
            {children}
        </CartContext.Provider>
    )
}

CartContextProvider.propTypes = {
    children: PropTypes.node,
}

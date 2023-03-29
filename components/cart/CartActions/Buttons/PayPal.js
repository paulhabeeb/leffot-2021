import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { captureException } from '@sentry/nextjs'
import axios from 'axios'
import getShippingMethods from '@lib/cart/get-shipping-methods'
import matchShippingMethods from '@lib/cart/match-shipping-methods'
import { useCartContext } from '../../CartContext'

import { ErrorMessage } from '@components/common'
import styles from './Buttons.module.scss'

// eslint-disable-next-line no-unused-vars
export default function PayPal({ location }) {
    const [error, setError] = useState(null)
    const router = useRouter()
    const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM }) // eslint-disable-line no-undef
    const {
        cart: {
            data: { consignments, id: cartId, line_items },
        },
        revalidateCart,
    } = useCartContext()
    const flatItems = Object.values(line_items).flat()

    const updateShippingMethods = async (
        address = {
            country_code: 'US',
            postal_code: '61822',
            state_or_province_code: 'IL',
        },
        selectedId = null
    ) => {
        const methods = await getShippingMethods({
            address,
            cartId,
            lineItems: line_items?.physical_items,
        })

        // If something changes, we need to revalidate the cart to get the latest data. E.g., if
        // an address that requires sales tax is selected, we need to update our figures to reflect
        // that. But we have to make two calls. The first is revalidateCart(), which uses the BC
        // hook and updates our cart in the background, behind the PayPal popup. But this call doesn't
        // return any usable information for us, so we have to make a second call to the checkouts
        // API endpoint. This returns the updated cart information, including new tax figures, new
        // shipping info, and more. We can then update the PayPal popup with this info. If we don't do
        // this, it's possible that someone could not be charged sales tax, be charged the wrong shipping
        // fee, or something else.
        revalidateCart()
        const updatedCart = methods
            ? await axios.get(
                  `/api/bc-rest/checkouts/${cartId}?include=consignments.available_shipping_options&cart.line_items.physical_items.options`
              )
            : null

        const { selectedMethod, shippingMethods } = matchShippingMethods(
            methods.available_shipping_options,
            selectedId,
            updatedCart?.data?.data?.cart?.currency?.code
        )

        if (selectedId) {
            const consignmentId = updatedCart?.data?.data?.consignments?.[0]?.id

            await axios({
                url: `/api/bc-rest/checkouts/${cartId}/consignments/${consignmentId}`,
                method: 'PUT',
                data: { shipping_option_id: selectedId },
            })
        }

        return {
            selectedMethod,
            shippingMethods,
            updatedCart: updatedCart?.data?.data,
        }
    }

    const createOrder = async () => {
        const initAddress = consignments?.[0]?.shipping_address
        const initMethodId = consignments?.[0]?.selected_shipping_option?.id

        const { shippingMethods, updatedCart } = await updateShippingMethods(
            initAddress,
            initMethodId
        )

        const { data } = await axios.post('/api/paypal/create-order', {
            amountToPay: updatedCart?.cart?.cart_amount_inc_tax,
            currencyCode: updatedCart?.cart?.currency?.code || 'USD',
            items: flatItems,
            itemsTotal: updatedCart?.cart?.cart_amount_ex_tax,
            shippingOptions: shippingMethods,
            taxTotal: updatedCart?.tax_total,
        })

        return data.id
    }

    const onApprove = async data => {
        const response = await axios.post('/api/paypal/approve-order', {
            cartId,
            orderId: data?.orderID || '',
            items: flatItems,
        })

        setError(null)
        router.push(`/checkout/order-confirmation/${response.data.id}`)
    }

    const onError = async error => {
        setError(
            'There was an error checking out with PayPal. Please try later or use a different payment method.'
        )
        captureException(error)
    }

    const onShippingChange = async (data, actions) => {
        const {
            selected_shipping_option,
            shipping_address: { country_code, postal_code, state },
        } = data

        const { selectedMethod, shippingMethods, updatedCart } =
            await updateShippingMethods(
                {
                    country_code,
                    postal_code,
                    state_or_province_code: state,
                },
                selected_shipping_option.id
            )

        if (shippingMethods.length < 1) {
            return actions.reject()
        }

        const currency_code = updatedCart?.cart?.currency?.code || 'USD'

        // Need to update the BC cart order with the shipping address here
        // That way when we get to the checkout stage all the info will be there
        // And then we don't have to deal with matching the PP shipping method with
        // the BC shipping method after the fact.

        return actions.order.patch([
            {
                op: 'replace',
                path: "/purchase_units/@reference_id=='default'/amount",
                value: {
                    currency_code,
                    value: (
                        parseFloat(updatedCart?.cart?.cart_amount_inc_tax) +
                        parseFloat(selectedMethod.value)
                    ).toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code,
                            value: updatedCart?.cart?.cart_amount_ex_tax,
                        },
                        shipping: { ...selectedMethod },
                        tax_total: {
                            currency_code,
                            value: updatedCart?.tax_total,
                        },
                    },
                },
            },
            {
                op: 'replace',
                path: "/purchase_units/@reference_id=='default'/shipping/options",
                value: shippingMethods,
            },
        ])
    }

    return (
        <>
            <div className={styles.paypalContainer}>
                <PayPalButton
                    createOrder={createOrder}
                    fundingSource={paypal.FUNDING.PAYPAL} // eslint-disable-line no-undef
                    onApprove={onApprove}
                    onError={onError}
                    onShippingChange={onShippingChange}
                    style={{
                        color: 'blue',
                        height: 52,
                        label: 'paypal',
                        layout: 'vertical',
                        shape: 'rect',
                        size: 'large',
                        tagline: false,
                    }}
                />
            </div>
            {error && <ErrorMessage className={styles.error} message={error} />}
        </>
    )
}

PayPal.propTypes = {
    location: PropTypes.string,
}

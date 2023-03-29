import { useEffect, useState } from 'react'
import { captureException } from '@sentry/nextjs'
import { NextSeo } from 'next-seo'
import dropin from 'braintree-web-drop-in'

import styles from './Checkout.module.scss'

export default function Checkout() {
    const [braintree, setBraintree] = useState(null)
    const onClick = () => {
        braintree.instance.requestPaymentMethod(
            (requestPaymentMethodErr, payload) => {
                // Submit payload.nonce to your server
                try {
                    payload()
                } catch (error) {
                    requestPaymentMethodErr()
                    captureException(error)
                }
            }
        )
    }

    useEffect(() => {
        dropin.create(
            {
                authorization: process.env.NEXT_PUBLIC_BRAINTREE_AUTH_TOKEN,
                container: '#dropin-container',
                paypal: {
                    flow: 'checkout',
                    amount: '10.00',
                    currency: 'USD',
                },
                applePay: {
                    displayName: 'Leffot',
                    paymentRequest: {
                        total: {
                            label: 'Leffot',
                            amount: '19.99',
                        },
                        // We recommend collecting billing address information, at minimum
                        // billing postal code, and passing that billing postal code with all
                        // Apple Pay transactions as a best practice.
                        requiredBillingContactFields: ['postalAddress'],
                    },
                },
            },
            (createErr, instance) => {
                // onClick(instance)
                setBraintree({ instance, createErr })
            }
        )
    }, [])

    return (
        <div className={styles.wrapper}>
            <main className={styles.container} id='main'>
                <NextSeo title='Checkout' />
                <h1 className={styles.title}>Check out</h1>
                <div id='dropin-container'></div>
                <button id='submit-button' onClick={onClick}>
                    Select
                </button>
            </main>
        </div>
    )
}

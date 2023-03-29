// import { useEffect } from 'react'
// import { ApplePay as ApplePayUtil } from '@lib/apple-pay'
import { useCartContext } from '../../CartContext'

import styles from './Buttons.module.scss'

export default function ApplePay() {
    const { applePayInstance } = useCartContext()

    const storeName = 'Leffot'

    const handleClick = () => {
        if (applePayInstance) {
            const paymentRequest = applePayInstance.createPaymentRequest({
                total: {
                    label: storeName,
                    amount: '19.99',
                },
                requiredBillingContactFields: ['postalAddress'],
            })

            const session = new ApplePaySession(3, paymentRequest) // eslint-disable-line no-undef
            session.onvalidatemerchant = event => {
                applePayInstance.performValidation(
                    {
                        validationURL: event.validationURL,
                        displayName: storeName,
                    },
                    (err, merchantSession) => {
                        if (err) {
                            // You should show an error to the user, e.g. 'Apple Pay failed to load.'
                            return
                        }
                        session.completeMerchantValidation(merchantSession)
                    }
                )
            }

            session.onpaymentauthorized = event => {
                applePayInstance.tokenize(
                    { token: event.payment.token },
                    (tokenizeErr, payload) => {
                        if (tokenizeErr) {
                            session.completePayment(
                                ApplePaySession.STATUS_FAILURE // eslint-disable-line no-undef
                            )

                            return
                        }

                        // Send payload.nonce to your server.
                        // If requested, address information is accessible in event.payment
                        // and may also be sent to your server.
                        console.log('nonce:', payload.nonce)

                        // After you have transacted with the payload.nonce,
                        // call `completePayment` to dismiss the Apple Pay sheet.
                        session.completePayment(ApplePaySession.STATUS_SUCCESS) // eslint-disable-line no-undef
                    }
                )
            }

            session.begin()
        }
    }

    return <div className={styles.applePayButton} onClick={handleClick} />
}

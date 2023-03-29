import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import usePrice from '@framework/use-price'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FormRow, Radio } from '@leffot/form-controls'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import { useCartContext } from '../../CartContext'
import styles from './Quotes.module.scss'

function Quote({ currencyCode, quote }) {
    const id = `shipping-quote-${quote.id}`
    const { price } = usePrice({
        amount: quote.cost,
        currencyCode,
    })

    const label = (
        <div className={styles.quoteLabel}>
            <span>{quote.description}</span>
            <span className={styles.quotePrice}>{price}</span>
        </div>
    )

    return (
        <FormRow>
            <Radio id={id} label={label} name='shipping_id' value={quote.id} />
        </FormRow>
    )
}

Quote.propTypes = {
    currencyCode: PropTypes.string,
    quote: PropTypes.object,
}

export default function Quotes({ cartId, currencyCode, quotes, setIsOpen }) {
    const { revalidateCart } = useCartContext()
    const initialValues = { shipping_id: '' }
    const validationSchema = { shipping_id: Yup.string() }

    if (!quotes) {
        return null
    }

    const handleSubmit = (values, { setSubmitting, setStatus }) => {
        const updateQuotes = async () => {
            try {
                const { data } = await axios.put(
                    `/api/bc-rest/checkouts/${cartId}/consignments/${quotes.id}`,
                    {
                        shipping_option_id: values.shipping_id,
                    }
                )

                setSubmitting(false)

                if (data?.errors) {
                    throw 'There was a problemo.'
                }

                setIsOpen(false)
                setStatus(null)
                revalidateCart()
            } catch (error) {
                setSubmitting(false)
                setStatus({
                    error: 'There was a problem selecting the shipping quote. Please try again later.',
                })
                Sentry.captureException(error)
            }
        }

        updateQuotes()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape(validationSchema)}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form
                    name='shipping-quotes'
                    className={styles.shippingQuotesWrapper}
                >
                    <h3 className={styles.title}>Select a Shipping Method</h3>
                    {quotes?.available_shipping_options?.length > 0 && (
                        <ul className={styles.shippingQuotes}>
                            {quotes.available_shipping_options.map(quote => (
                                <Quote
                                    currencyCode={currencyCode}
                                    quote={quote}
                                    key={quote.id}
                                />
                            ))}
                        </ul>
                    )}
                    <FormRow>
                        <Button
                            caption='Update Shipping Cost'
                            className={styles.button}
                            isSubmitting={isSubmitting}
                            loaderSize={16}
                        />
                    </FormRow>
                    {status && status.error && (
                        <ErrorMessage message={status.error} />
                    )}
                </Form>
            )}
        </Formik>
    )
}

Quotes.propTypes = {
    cartId: PropTypes.string,
    currencyCode: PropTypes.string,
    quotes: PropTypes.object,
    setIsOpen: PropTypes.func,
}

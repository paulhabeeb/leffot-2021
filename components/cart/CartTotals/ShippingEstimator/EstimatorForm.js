import { useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import getShippingMethods from '@lib/cart/get-shipping-methods'

import { useCartContext } from '../../CartContext'
import EstimatorFormActions from './EstimatorFormActions'

const initialValues = {
    country_code: '',
    email: '',
    postal_code: '',
    state_or_province: '',
}

export default function EstimatorForm({ cartId, items, setQuotes }) {
    const { revalidateCart } = useCartContext()
    const [schema, setSchema] = useState({
        country_code: null,
        postal_code: Yup.string().required('Required'),
        state_or_province: null,
    })

    const handleSubmit = (values, { setSubmitting, setStatus }) => {
        const getQuote = async () => {
            try {
                const shippingMethods = await getShippingMethods({
                    address: values,
                    cartId,
                    lineItems: items,
                })

                setSubmitting(false)
                setQuotes(shippingMethods)

                if (shippingMethods) {
                    setStatus(null)
                    revalidateCart()
                } else {
                    throw {
                        customMessage:
                            'There are no shipping methods available. Some items may not be able to be shipped to your destination.',
                    }
                }
            } catch (error) {
                setSubmitting(false)
                setStatus({
                    error:
                        error?.customMessage ||
                        'There was a problem retrieving the shipping quote. Please try again later.',
                })
                Sentry.captureException(error)
            }
        }

        getQuote()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({ ...schema })}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form name='shipping-estimator'>
                    <EstimatorFormActions
                        schema={schema}
                        setSchema={setSchema}
                    />
                </Form>
            )}
        </Formik>
    )
}

EstimatorForm.propTypes = {
    cartId: PropTypes.string,
    items: PropTypes.array,
    setQuotes: PropTypes.func,
}

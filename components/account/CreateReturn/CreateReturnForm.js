import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Fieldset, FormRow, Radio, Textarea } from '@leffot/form-controls'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import CreateReturnItem from './CreateReturnItem'
import styles from './CreateReturnForm.module.scss'

function getUSShipment(order) {
    if (order?.shipments?.length > 0) {
        return order.shipments.some(
            shipment => shipment.shipping_address.country_iso2 === 'US'
        )
    }

    return false
}

function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.onabort = () => reject(new Error('Read aborted'))
        reader.readAsDataURL(blob)
    })
}

export default function ReturnForm({
    cancelAction,
    completeReturn,
    order,
    returnPath,
}) {
    const isUSShipment = getUSShipment(order)
    const products = {}
    const productsValidation = {}

    order.products.forEach(product => {
        products[product.id] = {
            return_action: 'Choose one...',
            return_qty: 0,
            return_reason: 'Choose one...',
        }
        productsValidation[product.id] = Yup.object({
            return_action: Yup.string().test(
                'return_action',
                'Required',
                (value, context) =>
                    !(
                        context.parent.return_qty > 0 &&
                        value === 'Choose one...'
                    )
            ),
            return_qty: Yup.number().required('Required'),
            return_reason: Yup.string().test(
                'return_reason',
                'Required',
                (value, context) =>
                    !(
                        context.parent.return_qty > 0 &&
                        value === 'Choose one...'
                    )
            ),
        })
    })

    const formValues = {
        comments: '',
        products,
        shipping_label: '',
    }

    const validationSchema = Yup.object({
        comments: Yup.string(),
        products: Yup.object(productsValidation)
            .test(
                'products',
                'Please select one or more items to return.',
                value => {
                    return Object.values(value).some(val => val.return_qty > 0)
                }
            )
            .test('products', 'Make a selection', value => {
                return Object.values(value).some(
                    val =>
                        val.return_qty > 0 &&
                        val.return_action !== 'Choose one...'
                )
            }),
        shipping_label: Yup.string(),
    })

    const handleSubmit = (values, { setSubmitting, setStatus }) => {
        // x1. If a shipping label is requested, generate the label
        // x2. Save return data to Supabase
        // x3. Handle errors at each step of the way.
        // 4. Display success message, with refund amount and credit amount, and shipping label (if provided)
        // x5. Move Supabase stuff to a Nextjs API endpoint, so it's not done on the client
        // x6. Make sure api route can't be used maliciously
        // x7. Generate some kind of form or insert for them to put in the shipment so we can identify the return
        const submitReturn = async () => {
            try {
                const response = await axios({
                    method: 'POST',
                    url: '/api/returns/create',
                    responseType: 'blob',
                    data: {
                        order,
                        returnPath,
                        values,
                    },
                })

                // The label comes as a blob for user download, but we also need it as a string
                // to display it inline in an iframe.
                const labelData = await blobToDataURL(response.data)

                setSubmitting(false)
                completeReturn({
                    email: order?.billing_address?.email || null,
                    labelBlob: response?.data || null,
                    labelData,
                    labelRequested: values.shipping_label === 'Yes',
                })
            } catch (error) {
                setStatus(
                    'There was a problem submitting the form. Please complete all required fields and try again later.'
                )
                setSubmitting(false)
                Sentry.captureException(error)
            }
        }

        setSubmitting(true)
        submitReturn()
    }

    return (
        <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, isSubmitting, status, touched }) => {
                const hasQuantityErrors =
                    errors?.products &&
                    typeof errors.products === 'string' &&
                    touched?.products

                return (
                    <Form>
                        <p className={styles.caption}>
                            Please select the{' '}
                            {order.products.length > 1 ? 'item(s)' : 'item'}{' '}
                            you’d like to return.
                        </p>
                        <Fieldset>
                            <ul>
                                {order.products.map((item, index) => (
                                    <CreateReturnItem {...item} key={index} />
                                ))}
                            </ul>
                            {hasQuantityErrors && (
                                <ErrorMessage
                                    className={styles.topError}
                                    message={errors.products}
                                />
                            )}
                        </Fieldset>
                        <div className={styles.comments}>
                            <Textarea
                                id='comments'
                                label='Comments (Optional)'
                                name='comments'
                            />
                        </div>
                        {isUSShipment && (
                            <div className={styles.shippingLabel}>
                                <Fieldset>
                                    <legend
                                        className={styles.shippingLabelHeader}
                                    >
                                        <h3
                                            className={
                                                styles.shippingLabelTitle
                                            }
                                        >
                                            Would you like a return label?
                                        </h3>
                                        <p
                                            className={
                                                styles.shippingLabelCaption
                                            }
                                        >
                                            $15 will be deducted from your
                                            refund or store credit. Available
                                            only for returns within the US.
                                        </p>
                                    </legend>
                                    <div className={styles.shippingLabelOption}>
                                        <Radio
                                            id='shipping_label_yes'
                                            label='Yes, please provide me with a USPS return label.'
                                            name='shipping_label'
                                            value='Yes'
                                        />
                                    </div>
                                    <div className={styles.shippingLabelOption}>
                                        <Radio
                                            id='shipping_label_no'
                                            label="No, I'll handle shipping on my own."
                                            name='shipping_label'
                                            value='No'
                                        />
                                    </div>
                                </Fieldset>
                            </div>
                        )}
                        <FormRow>
                            <Button
                                caption='Submit Return Request'
                                className={styles.button}
                                isSubmitting={isSubmitting}
                                loaderSize={20}
                                type='submit'
                            />
                            <Link
                                href={cancelAction}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </Link>
                        </FormRow>
                        {hasQuantityErrors && (
                            <ErrorMessage message={errors.products} />
                        )}
                        {status && <ErrorMessage message={status} />}
                    </Form>
                )
            }}
        </Formik>
    )
}

ReturnForm.propTypes = {
    cancelAction: PropTypes.string,
    completeReturn: PropTypes.func,
    order: PropTypes.object,
    returnPath: PropTypes.string,
}

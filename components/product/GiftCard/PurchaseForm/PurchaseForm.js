import * as Sentry from '@sentry/nextjs'
import useCustomer from '@framework/use-customer'
import { Formik, Form } from 'formik'
import {
    Checkbox,
    Fieldset,
    FormRow,
    Textarea,
    TextInput,
} from '@leffot/form-controls'
import { giftCertificatePurchase } from '@lib/form-schema'
import useAddItem from '@lib/products/use-add-gift-certificate'
import togglePreviewCart from '@lib/toggle-preview-cart'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './PurchaseForm.module.scss'

export default function PurchaseForm() {
    const addItem = useAddItem()
    const { data: customerData } = useCustomer()

    const maximum = {
        formatted: '$3,000.00',
        value: 3000,
    }
    const minimum = {
        formatted: '$0.00',
        value: 0,
    }

    const formValues = {
        agree: false,
        amount: '',
        message: '',
        name: 'Gift Card',
        quantity: 1,
        recipient: {
            email: '',
            name: '',
        },
        sender: {
            email: '',
            name: '',
        },
        theme: 'General',
    }

    const validationSchema = giftCertificatePurchase(minimum, maximum)

    const handleSubmit = async (
        values,
        { resetForm, setSubmitting, setStatus }
    ) => {
        try {
            await addItem({
                gift_certificates: [values],
                customer_id: customerData?.entityId,
            })

            togglePreviewCart()
            resetForm()
            setSubmitting(false)
            setStatus(null)
        } catch (error) {
            setStatus(
                'There was a problem submitting the form. Please complete all required fields and try again later.'
            )
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <section className={styles.container}>
            <ErrorBoundary>
                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status }) => (
                        <Form>
                            <Fieldset>
                                <FormRow>
                                    <div className={styles.amount}>
                                        <span>$</span>
                                        <TextInput
                                            id='amount'
                                            label={`Amount (max ${maximum.formatted})`}
                                            name='amount'
                                            type='text'
                                        />
                                    </div>
                                </FormRow>
                            </Fieldset>
                            <FormRow>
                                <TextInput
                                    id='sender.name'
                                    label='Your Name'
                                    name='sender.name'
                                    type='text'
                                />
                            </FormRow>
                            <FormRow>
                                <TextInput
                                    id='sender.email'
                                    label='Your Email'
                                    name='sender.email'
                                    type='email'
                                />
                            </FormRow>
                            <FormRow>
                                <TextInput
                                    id='recipient.name'
                                    label='Recipient’s Name'
                                    name='recipient.name'
                                    type='text'
                                />
                            </FormRow>
                            <FormRow>
                                <TextInput
                                    id='recipient.email'
                                    label='Recipient’s Email'
                                    name='recipient.email'
                                    type='email'
                                />
                            </FormRow>
                            <Fieldset>
                                <FormRow>
                                    <Textarea
                                        label='Message (optional)'
                                        id='message'
                                        name='message'
                                    />
                                </FormRow>
                                <FormRow>
                                    <Checkbox id='agree' name='agree'>
                                        I agree that gift cards are
                                        non-refundable.
                                    </Checkbox>
                                </FormRow>
                            </Fieldset>
                            {status && (
                                <ErrorMessage
                                    className={styles.error}
                                    message={status}
                                />
                            )}
                            <div>
                                <Button
                                    caption='Add to Cart'
                                    className={styles.button}
                                    isSubmitting={isSubmitting}
                                    type='submit'
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </ErrorBoundary>
        </section>
    )
}

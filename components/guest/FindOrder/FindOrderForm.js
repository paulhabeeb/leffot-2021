import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { FormRow, TextInput } from '@leffot/form-controls'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { email } from '@lib/form-schema'
import axios from 'axios'
import { urls } from '@lib/data'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './FindOrderForm.module.scss'

export default function FindOrderForm({ showError }) {
    const router = useRouter()
    const initialValues = {
        email: '',
        orderId: '',
    }

    const handleSubmit = (values, { setStatus, setSubmitting }) => {
        const submit = async () => {
            try {
                setSubmitting(true)
                await axios.get('/api/guest-order', {
                    params: { ...values },
                })

                const url = urls.guest.orders.single.replace(
                    ':orderId',
                    values.orderId
                )
                router.push(url)
                setStatus(null)
                setSubmitting(false)
            } catch (error) {
                setSubmitting(false)
                setStatus(true)
                Sentry.captureException(error)
            }
        }

        submit()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: email.email,
                orderId: Yup.string().required('Required'),
            })}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form>
                    <FormRow>
                        <TextInput
                            label='Email Address'
                            id='email'
                            name='email'
                            type='email'
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput
                            label='Order Number'
                            id='orderId'
                            name='orderId'
                            type='orderId'
                        />
                    </FormRow>
                    <FormRow>
                        <Button
                            caption='Submit'
                            className={styles.button}
                            isSubmitting={isSubmitting}
                            loaderSize={19}
                        />
                    </FormRow>
                    {(status || showError) && (
                        <FormRow>
                            <ErrorMessage message='An order matching the email address and order number you entered could not be found. Please try another combination or contact us at info@leffot.com.' />
                        </FormRow>
                    )}
                </Form>
            )}
        </Formik>
    )
}

FindOrderForm.propTypes = {
    showError: PropTypes.bool,
}

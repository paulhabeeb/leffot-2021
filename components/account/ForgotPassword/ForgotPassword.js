import * as Sentry from '@sentry/nextjs'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FormRow, TextInput } from '@leffot/form-controls'
import { email } from '@lib/form-schema'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './ForgotPassword.module.scss'

export default function ForgotPassword() {
    const handleSubmit = async (
        values,
        { resetForm, setStatus, setSubmitting }
    ) => {
        try {
            await axios.post('/api/bc-rest/customers/password', values)

            resetForm()
            setStatus({
                success: true,
                error: null,
            })
            setSubmitting(false)
        } catch (error) {
            setStatus({
                success: false,
                error: 'There was a problem submitting the form. Please try again later, or email us at info@leffot.com.',
            })
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <main id='main' className={styles.container}>
            <h1 className={styles.title}>Forgot Password</h1>
            <ErrorBoundary>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object(email)}
                >
                    {({ isSubmitting, status }) => {
                        if (status?.success) {
                            return (
                                <div className={styles.caption}>
                                    If the email address you entered matches an
                                    account on file, the reset instructions are
                                    on their way.
                                </div>
                            )
                        }

                        return (
                            <>
                                <p className={styles.caption}>
                                    Enter your email address below and we’ll
                                    send you password reset instructions.
                                </p>
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
                                        <Button
                                            caption='Email me reset instructions'
                                            className={styles.button}
                                            isSubmitting={isSubmitting}
                                            loaderSize={19}
                                        />
                                    </FormRow>
                                </Form>
                                {status?.error && (
                                    <ErrorMessage
                                        className={styles.status}
                                        message={status.error}
                                    />
                                )}
                            </>
                        )
                    }}
                </Formik>
            </ErrorBoundary>
        </main>
    )
}

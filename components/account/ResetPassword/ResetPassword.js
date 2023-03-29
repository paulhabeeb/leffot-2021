import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FormRow, TextInput } from '@leffot/form-controls'
import { urls } from '@lib/data'
import { resetPassword } from '@lib/form-schema'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './ResetPassword.module.scss'

export default function ResetPassword() {
    const router = useRouter()

    const handleSubmit = (values, { setStatus, setSubmitting }) => {
        const resetPassword = async () => {
            try {
                await axios.post('/api/password-reset', values)

                router.push({
                    pathname: urls.auth.login,
                    query: { resetPassword: true },
                })
            } catch (error) {
                const message =
                    error?.response?.data?.message ||
                    'There was a problem submitting the form. Please try again later, or email us at info@leffot.com.'

                setStatus(message)
                setSubmitting(false)
                Sentry.captureException(error)
            }
        }

        setSubmitting(true)
        resetPassword()
    }

    return (
        <main id='main' className={styles.container}>
            <h1 className={styles.title}>Reset Password</h1>
            <ErrorBoundary>
                <Formik
                    initialValues={{ password: '', passwordConfirm: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={Yup.object(resetPassword)}
                >
                    {({ isSubmitting, status }) => (
                        <>
                            <p className={styles.caption}>
                                Please enter a new password below.
                            </p>
                            <Form>
                                <FormRow>
                                    <TextInput
                                        label='Password'
                                        id='password'
                                        name='password'
                                        type='password'
                                    />
                                </FormRow>
                                <FormRow>
                                    <TextInput
                                        label='Confirm Password'
                                        id='passwordConfirm'
                                        name='passwordConfirm'
                                        type='password'
                                    />
                                </FormRow>
                                <FormRow>
                                    <Button
                                        caption='Update Password'
                                        className={styles.button}
                                        isSubmitting={isSubmitting}
                                        loaderSize={19}
                                    />
                                </FormRow>
                            </Form>
                            {status && (
                                <ErrorMessage
                                    className={styles.status}
                                    message={status}
                                />
                            )}
                        </>
                    )}
                </Formik>
            </ErrorBoundary>
        </main>
    )
}

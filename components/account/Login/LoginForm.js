import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useLogin from '@framework/use-login'
import { FormRow, TextInput } from '@leffot/form-controls'
import { urls } from '@lib/data'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { login as loginSchema } from '@lib/form-schema'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './LoginForm.module.scss'

export default function LoginForm() {
    const router = useRouter()
    const login = useLogin()

    const initialValues = {
        email: '',
        password: '',
    }

    const handleSubmit = (values, { setStatus, setSubmitting }) => {
        const submit = async () => {
            try {
                setStatus(null)
                await login(values)
                router.push(urls.account.index)
            } catch (error) {
                setSubmitting(false)
                setStatus(
                    'The email and password combination you entered is incorrect. Please try again.'
                )
                Sentry.captureException(error)
            }
        }

        submit()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(loginSchema)}
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
                            label='Password'
                            id='password'
                            name='password'
                            type='password'
                        />
                    </FormRow>
                    <FormRow>
                        <Button
                            caption='Sign In'
                            className={styles.button}
                            isSubmitting={isSubmitting}
                            loaderSize={19}
                        />
                    </FormRow>
                    {status && (
                        <FormRow>
                            <ErrorMessage message={status} />
                        </FormRow>
                    )}
                    <Link
                        href={urls.auth.forgot_password}
                        className={styles.forgot}
                    >
                        Forgot your password?
                    </Link>
                </Form>
            )}
        </Formik>
    )
}

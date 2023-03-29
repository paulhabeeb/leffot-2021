import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import useCustomer from '@framework/use-customer'
import useSignup from '@framework/use-signup'
import { FormRow, TextInput } from '@leffot/form-controls'
import { urls } from '@lib/data'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { newAccount } from '@lib/form-schema'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import { Recaptcha } from '@components/forms/controls'
import styles from './CreateAccountForm.module.scss'

export default function CreateAccountForm() {
    const router = useRouter()
    const signup = useSignup()
    const { data } = useCustomer()

    // If the customer is logged in, redirect them to the account page
    if (data) {
        router.push(urls.account.index)
    }

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        recaptcha: '',
    }

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        const submit = async () => {
            try {
                setStatus(null)
                await signup(values)
            } catch (error) {
                setStatus(
                    'The account information you entered is invalid. There may already be a user with this email address. Please try again.'
                )
                setSubmitting(false)
                Sentry.captureException(error)
            }
        }
        submit()
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(newAccount)}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form>
                    <FormRow style='half'>
                        <div>
                            <TextInput
                                label='First Name'
                                id='firstName'
                                name='firstName'
                                type='text'
                            />
                        </div>
                        <div>
                            <TextInput
                                label='Last Name'
                                id='lastName'
                                name='lastName'
                                type='text'
                            />
                        </div>
                    </FormRow>
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
                        <TextInput
                            label='Confirm Password'
                            id='passwordConfirm'
                            name='passwordConfirm'
                            type='password'
                        />
                    </FormRow>
                    <FormRow>
                        <Recaptcha name='recaptcha' />
                    </FormRow>
                    <FormRow>
                        <Button
                            caption='Create Account'
                            className={styles.button}
                            isSubmitting={isSubmitting}
                            loaderSize={19}
                        />
                    </FormRow>
                    {status && <ErrorMessage message={status} />}
                </Form>
            )}
        </Formik>
    )
}

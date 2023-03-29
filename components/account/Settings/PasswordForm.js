import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Fieldset, FormRow, TextInput } from '@leffot/form-controls'
import { password, passwordConfirm } from '@lib/form-schema'
import { urls } from '@lib/data'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './Settings.module.scss'

export default function PasswordForm({ customer }) {
    const router = useRouter()

    const initialValues = {
        current_password: '',
        authentication: {
            new_password: '',
            confirm_new_password: '',
        },
        id: customer.entityId,
    }

    const validationSchema = Yup.object({
        current_password: Yup.string().required('Required'),
        authentication: Yup.object({
            new_password: password,
            confirm_new_password: passwordConfirm('new_password'),
        }),
        id: Yup.number().required(),
    })

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            // Verify the current password
            const { data } = await axios.post(
                '/api/bc-rest/customers/validate-credentials',
                {
                    email: customer.email,
                    password: values.current_password,
                }
            )

            // If the current password is correct, update password
            if (data.is_valid) {
                await axios.put('/api/bc-rest/customers', [values])

                setStatus(null)
                // resetForm()
                router.push({
                    pathname: urls.account.details,
                    query: {
                        success: 'password',
                    },
                })
            } else {
                throw 'Error updating password.'
            }
        } catch (error) {
            setStatus(
                'There was a problem updating your password. Please complete all required fields and try again later.'
            )
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form className={styles.passwordForm}>
                    <h3 className={styles.formHeader}>Password</h3>
                    <Fieldset>
                        <FormRow>
                            <TextInput
                                id='current_password'
                                label='Current Password'
                                name='current_password'
                                type='password'
                            />
                        </FormRow>
                        <FormRow>
                            <TextInput
                                id='authentication.new_password'
                                label='New Password'
                                name='authentication.new_password'
                                type='password'
                            />
                        </FormRow>
                        <FormRow>
                            <TextInput
                                id='authentication.confirm_new_password'
                                label='Confirm New Password'
                                name='authentication.confirm_new_password'
                                type='password'
                            />
                        </FormRow>
                    </Fieldset>
                    <div className={styles.actions}>
                        <Button
                            caption='Update Password'
                            className={styles.submit}
                            isSubmitting={isSubmitting}
                            loaderSize={15}
                        />
                        {status && (
                            <ErrorMessage
                                className={styles.actions}
                                message={status}
                            />
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    )
}

PasswordForm.propTypes = {
    customer: PropTypes.object,
}

import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'

import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Fieldset, FormRow, TextInput } from '@leffot/form-controls'
import { email } from '@lib/form-schema'
import { urls } from '@lib/data'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './Settings.module.scss'

export default function SettingsForm({ customer }) {
    const router = useRouter()

    const initialValues = {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        id: customer.entityId,
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        email: email.email,
        id: Yup.number().required(),
    })

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            await axios.put('/api/bc-rest/customers', [values])
            setStatus(null)
            router.push({
                pathname: urls.account.details,
                query: {
                    success: 'profile',
                },
            })
        } catch (error) {
            setStatus(
                'There was a problem updating your account details. Please complete all required fields and try again later.'
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
                <Form>
                    <h3 className={styles.formHeader}>Profile</h3>
                    <Fieldset>
                        <FormRow style='half'>
                            <div>
                                <TextInput
                                    id='first_name'
                                    label='First Name'
                                    name='first_name'
                                />
                            </div>
                            <div>
                                <TextInput
                                    id='last_name'
                                    label='Last Name'
                                    name='last_name'
                                />
                            </div>
                        </FormRow>
                        <FormRow>
                            <TextInput
                                id='email'
                                label='Email Address'
                                name='email'
                                type='email'
                            />
                        </FormRow>
                    </Fieldset>
                    <div className={styles.actions}>
                        <Button
                            caption='Update Details'
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

SettingsForm.propTypes = {
    customer: PropTypes.object,
}

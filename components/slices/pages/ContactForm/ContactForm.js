import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { asText } from '@prismicio/helpers'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FormRow, Textarea, TextInput } from '@leffot/form-controls'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './ContactForm.module.scss'

export default function ContactForm({ slice }) {
    const initialValues = {
        email: '',
        message: '',
        name: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Required'),
        message: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
    })

    const handleSubmit = async (
        values,
        { resetForm, setStatus, setSubmitting }
    ) => {
        try {
            await axios.post('/api/contact-us', values)

            resetForm()
            setStatus({
                success:
                    'Thanks for contacting us. We’ll get back to you as soon as possible.',
                error: null,
            })
            setSubmitting(false)
        } catch (error) {
            setStatus({
                success: null,
                error: 'There was a problem submitting the form. Please try again later, or email us at info@leffot.com.',
            })
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <ErrorBoundary>
            <h1 className={styles.title}>{asText(slice.primary.title1)}</h1>
            <p className={styles.caption}>{asText(slice.primary.caption)}</p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <FormRow>
                            <TextInput
                                label='Name'
                                id='contact-name'
                                name='name'
                                placeholder='Enter your name'
                                type='text'
                            />
                        </FormRow>
                        <FormRow>
                            <TextInput
                                label='Email'
                                id='contact-email'
                                name='email'
                                placeholder='Your email address'
                                type='email'
                            />
                        </FormRow>
                        <FormRow>
                            <Textarea
                                label='Message'
                                id='contact-message'
                                name='message'
                                placeholder='Enter a message'
                            />
                        </FormRow>
                        <Button
                            caption='Submit'
                            className={styles.button}
                            isSubmitting={isSubmitting}
                            type='submit'
                        />
                        {status && status.error && (
                            <ErrorMessage
                                className={styles.status}
                                message={status.error}
                            />
                        )}
                        {status && status.success && (
                            <div className={styles.status}>
                                {status.success}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </ErrorBoundary>
    )
}

ContactForm.propTypes = {
    slice: PropTypes.object,
}

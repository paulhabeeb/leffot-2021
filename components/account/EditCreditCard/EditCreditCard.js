import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { useParams } from 'react-router-dom'
import urls from '@data/urls'
import { useSiteContext } from '@components/common/Context'
import { useGetCustomerData } from '@lib/Hooks/useGetCustomerData'

import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import qs from 'qs'
import { Checkbox, FormRow } from '@leffot/form-controls'
import { address, creditCardIsDefault, stateRequired } from '@lib/form-schema'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import { SubmitOrCancel } from '@components/forms/actions'
import { LongFormsLoader } from '@components/placeholders'
import { AddressFormFields } from '../AddressForm'
import styles from './EditCreditCard.module.scss'

export default function EditCreditCard() {
    const { token } = useParams()
    useGetCustomerData({
        context: 'edit_payment_method',
        path: `/account.php?action=edit_payment_method&token=${token}`,
    })

    const [addressValidation, setAddressValidation] = useState({
        ...address,
        ...stateRequired,
    })

    const { loading, error, data } = useSiteContext()

    if (!data.editStoredInstrument || loading) return <LongFormsLoader />
    if (error) return 'There was a problem. Please try again later.'

    const {
        csrfToken,
        currency_selector,
        editStoredInstrument: {
            expiry_month,
            expiry_year,
            forms: { action, billing_fields },
            is_default,
            last_4,
            token: tokenRedux,
            type,
        },
    } = data

    const initAddress = {}

    billing_fields.forEach(field => {
        let val = field.value
        if (field.private_id === 'Country') {
            field.options.forEach(country => {
                if (country.selected) {
                    val = country.label
                }
            })
        }
        initAddress[field.private_id] = val
    })

    const formValues = {
        address1: initAddress.AddressLine1,
        address2: initAddress.AddressLine2,
        city: initAddress.City,
        company: initAddress.CompanyName,
        country_code: initAddress.Country,
        default_instrument: is_default,
        first_name: initAddress.FirstName,
        last_name: initAddress.LastName,
        phone: initAddress.Phone,
        postal_code: initAddress.Zip,
        state_or_province: initAddress.State,
    }

    const validationSchema = Yup.object({
        ...addressValidation,
        ...creditCardIsDefault,
    })

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const billingAddress = {
                FormField: {
                    2: {
                        4: values.first_name,
                        5: values.last_name,
                        6: values.company,
                        7: values.phone,
                        8: values.address1,
                        9: values.address2,
                        10: values.city,
                        11: values.country_code,
                        12: values.state_or_province,
                        13: values.postal_code,
                    },
                },
            }

            // For some reason if you're setting the card to *not* be default,
            // BC doesn't want that information in the array. So we include it only
            // if you *are* making the card default.
            const isDefault = {}
            if (values.default_instrument) {
                isDefault.default_instrument = values.default_instrument
                isDefault.is_default = values.default_instrument
            }

            const formData = {
                ...billingAddress,
                ...isDefault,
                authenticity_token: csrfToken,
                currency_code: currency_selector.active_currency_code,
                token: tokenRedux,
                type,
            }

            await axios({
                method: 'POST',
                url: action,
                data: qs.stringify(formData),
            })

            window.location.href = urls.account.payment_methods.all
        } catch (error) {
            setStatus(
                'There was a problem submitting the form. Please complete all required fields and try again later.'
            )
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <ErrorBoundary>
            <div className={styles.container}>
                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status }) => (
                        <Form>
                            {type === 'stored_card' && (
                                <>
                                    <h3 className={styles.title}>
                                        Card Information
                                    </h3>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardData}>
                                            <div>
                                                <h5
                                                    className={
                                                        styles.cardNumber
                                                    }
                                                >
                                                    Card Number
                                                </h5>
                                                <p>•••• {last_4}</p>
                                            </div>
                                            <div>
                                                <h5
                                                    className={
                                                        styles.cardNumber
                                                    }
                                                >
                                                    Expiration
                                                </h5>
                                                <p>
                                                    {expiry_month}/{expiry_year}
                                                </p>
                                            </div>
                                        </div>
                                        <FormRow>
                                            <Checkbox name='default_instrument'>
                                                Default payment method
                                            </Checkbox>
                                        </FormRow>
                                    </div>
                                </>
                            )}
                            <h3 className={styles.title}>Billing Address</h3>
                            <AddressFormFields
                                initialValues={formValues}
                                setAddressValidation={setAddressValidation}
                            />
                            {status && <ErrorMessage message={status} />}
                            <SubmitOrCancel
                                cancelAction={urls.account.payment_methods.all}
                                isSubmitting={isSubmitting}
                                submitCaption='Update Card'
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </ErrorBoundary>
    )
}

import { useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import useAddAddress from '@framework/address/use-add-address'
import useUpdateAddress from '@framework/address/use-update-address'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { address, stateRequired } from '@lib/form-schema'

import AddressFormFields from './AddressFormFields'
import styles from './AddressForm.module.scss'

export default function AddressForm({
    buttonTitle,
    edit,
    initialValues,
    toggleModal,
    updateAddresses,
}) {
    const addAddress = useAddAddress()
    const updateAddress = useUpdateAddress()

    const [addressValidation, setAddressValidation] = useState({
        ...address,
        ...stateRequired,
    })

    const validationSchema = Yup.object({
        ...addressValidation,
        address_type: Yup.string().required('Required'),
        id: Yup.number(),
    })

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            if (edit) {
                await updateAddress(values)
            } else {
                await addAddress(values)
            }

            updateAddresses(edit)
            setStatus(null)
            toggleModal()
        } catch (error) {
            setStatus(
                'There was a problem submitting the form. Please complete all required fields and try again later.'
            )
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <AddressFormFields
                            buttonTitle={buttonTitle}
                            cancelAction={toggleModal}
                            initialValues={initialValues}
                            schema={addressValidation}
                            setSchema={setAddressValidation}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

AddressForm.defaultProps = {
    initialValues: {
        address1: '',
        address2: '',
        address_type: 'residential',
        city: '',
        company: '',
        country_code: 'United States',
        first_name: '',
        last_name: '',
        phone: '',
        postal_code: '',
        state_or_province: '',
    },
    edit: false,
}

AddressForm.propTypes = {
    buttonTitle: PropTypes.string,
    edit: PropTypes.bool,
    initialValues: PropTypes.object,
    toggleModal: PropTypes.func,
    updateAddresses: PropTypes.func,
}

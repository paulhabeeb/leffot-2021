import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import useRemoveAddress from '@framework/address/use-remove-address'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { SubmitOrCancel } from '@components/forms/actions'
import ModalHeader from '@components/modals/ModalHeader'
import SmallModal from '@components/modals/SmallModal'

export default function DeleteAddressModal({
    addressId,
    isOpen,
    setHasError,
    setIsDeleting,
    toggleModal,
    updateAddresses,
}) {
    const removeAddress = useRemoveAddress()

    const initialValues = { addressId }
    const validationSchema = Yup.object({
        addressId: Yup.string(),
    })

    const handleSubmit = async values => {
        try {
            toggleModal()
            setIsDeleting(true)

            await removeAddress({
                id: values.addressId,
            })

            updateAddresses(false, true)
        } catch (error) {
            setIsDeleting(false)
            setHasError(true)
            Sentry.captureException(error)
        }
    }

    return (
        <SmallModal
            isOpen={isOpen}
            label='Confirm Deletion'
            toggleModal={toggleModal}
        >
            <ModalHeader
                body='Are you sure you want to delete this address?'
                title='Confirm Deletion'
            />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <SubmitOrCancel
                            cancelAction={toggleModal}
                            isSubmitting={isSubmitting}
                            style='delete'
                            submitCaption='Delete'
                        />
                    </Form>
                )}
            </Formik>
        </SmallModal>
    )
}

DeleteAddressModal.propTypes = {
    addressId: PropTypes.number,
    isOpen: PropTypes.bool,
    setHasError: PropTypes.func,
    setIsDeleting: PropTypes.func,
    toggleModal: PropTypes.func,
    updateAddresses: PropTypes.func,
}

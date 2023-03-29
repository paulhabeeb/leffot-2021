import PropTypes from 'prop-types'

import { ModalHeader, SmallModal } from '@components/modals'
import AddressForm from '../AddressForm'

export default function EditAddressModal({
    address,
    isOpen,
    toggleModal,
    updateAddresses,
}) {
    return (
        <SmallModal
            isOpen={isOpen}
            label='Update Address'
            toggleModal={toggleModal}
        >
            <ModalHeader title='Update Address' />
            <AddressForm
                buttonTitle='Update Address'
                edit={true}
                initialValues={address}
                toggleModal={toggleModal}
                updateAddresses={updateAddresses}
            />
        </SmallModal>
    )
}

EditAddressModal.propTypes = {
    address: PropTypes.object,
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    updateAddresses: PropTypes.func,
}

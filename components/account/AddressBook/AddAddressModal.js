import PropTypes from 'prop-types'

import { ModalHeader, SmallModal } from '@components/modals'
import AddressForm from './AddressForm'

export default function AddAddressModal({
    isOpen,
    toggleModal,
    updateAddresses,
}) {
    return (
        <SmallModal
            isOpen={isOpen}
            label='Add Address'
            toggleModal={toggleModal}
        >
            <ModalHeader title='Add Address' />
            <AddressForm
                buttonTitle='Add Address'
                toggleModal={toggleModal}
                updateAddresses={updateAddresses}
            />
        </SmallModal>
    )
}

AddAddressModal.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    updateAddresses: PropTypes.func,
}

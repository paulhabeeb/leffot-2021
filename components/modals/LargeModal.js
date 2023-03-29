import PropTypes from 'prop-types'
import BaseModal from './BaseModal'

export default function LargeModal({
    children,
    id,
    isOpen,
    label,
    toggleModal,
}) {
    return (
        <BaseModal
            id={id}
            isOpen={isOpen}
            label={label}
            toggleModal={toggleModal}
            width={650}
        >
            {children}
        </BaseModal>
    )
}

LargeModal.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    label: PropTypes.string,
    toggleModal: PropTypes.func,
}

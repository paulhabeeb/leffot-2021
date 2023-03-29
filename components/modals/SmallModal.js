import PropTypes from 'prop-types'
import BaseModal from './BaseModal'

export default function SmallModal({
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
            width={500}
        >
            {children}
        </BaseModal>
    )
}

SmallModal.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    label: PropTypes.string,
    toggleModal: PropTypes.func,
}

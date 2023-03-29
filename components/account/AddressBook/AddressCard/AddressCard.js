import { useState } from 'react'
import PropTypes from 'prop-types'

import { ErrorMessage } from '@components/common'
import { CircleLoader } from '@components/placeholders'
import DeleteAddressModal from './DeleteAddressModal'
import EditAddressModal from './EditAddressModal'
import styles from './AddressCard.module.scss'

export default function AddressCard({ address, updateAddresses }) {
    const [hasError, setHasError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)

    const toggleDeleteModal = () => setDeleteModalIsOpen(!deleteModalIsOpen)
    const toggleEditModal = () => setEditModalIsOpen(!editModalIsOpen)

    const {
        address1,
        address2,
        city,
        company,
        country,
        first_name,
        id: addressId,
        last_name,
        phone,
        postal_code,
        state_or_province,
    } = address

    return (
        <li className={styles.card}>
            {isDeleting && (
                <div className={styles.overlay}>
                    <CircleLoader />
                </div>
            )}
            <div>
                <div>
                    {first_name} {last_name}
                </div>
                <div>{company}</div>
                <div>{address1}</div>
                <div>{address2}</div>
                <div>
                    {city}, {state_or_province} {postal_code}
                </div>
                <div>{country}</div>
                <div>{phone}</div>
            </div>
            <div className={styles.actions}>
                <button
                    className={styles.edit}
                    onClick={toggleEditModal}
                    onKeyPress={toggleEditModal}
                >
                    Edit
                </button>
                <button
                    className={styles.delete}
                    onClick={toggleDeleteModal}
                    onKeyPress={toggleDeleteModal}
                >
                    Delete
                </button>
            </div>
            {hasError && (
                <ErrorMessage
                    className={styles.error}
                    message='There was an error deleting this address. Please try again later.'
                />
            )}
            <EditAddressModal
                address={address}
                isOpen={editModalIsOpen}
                toggleModal={toggleEditModal}
                updateAddresses={updateAddresses}
            />
            <DeleteAddressModal
                addressId={addressId}
                isOpen={deleteModalIsOpen}
                setHasError={setHasError}
                setIsDeleting={setIsDeleting}
                toggleModal={toggleDeleteModal}
                updateAddresses={updateAddresses}
            />
        </li>
    )
}

AddressCard.propTypes = {
    address: PropTypes.object,
    updateAddresses: PropTypes.func,
}

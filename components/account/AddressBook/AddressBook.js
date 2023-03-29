import { useState } from 'react'
import useAddresses from '@framework/address/use-addresses'

import { Empty } from '@components/account/common'
import { Alert, ErrorBoundary } from '@components/common'
import { LongFormsLoader } from '@components/placeholders'
import AddAddressModal from './AddAddressModal'
import AddressCard from './AddressCard'
import styles from './AddressBook.module.scss'

export default function AddressBook() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [status, setStatus] = useState({
        added: false,
        updated: false,
    })

    const { data, error, revalidate } = useAddresses()

    if (error) {
        return 'There was an error loading your address book. Please try again later.'
    }

    if (!data) {
        return <LongFormsLoader />
    }

    const { addresses } = data

    const updateAddresses = async (edit, deleted = false) => {
        const updatedStatus = deleted
            ? {
                  added: false,
                  updated: false,
              }
            : {
                  added: !edit,
                  updated: edit,
              }

        await revalidate()
        setStatus(updatedStatus)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    return (
        <ErrorBoundary>
            <button
                className={styles.button}
                onClick={() => setModalIsOpen(true)}
            >
                Add an address +
            </button>
            {status.added && <Alert message='Success! Address added.' />}
            {status.updated && <Alert message='Success! Address updated.' />}
            {addresses ? (
                <ul className={styles.addressList}>
                    {addresses.map(address => (
                        <AddressCard
                            address={address}
                            updateAddresses={updateAddresses}
                            key={address.id}
                        />
                    ))}
                </ul>
            ) : (
                <Empty caption='You have not added any addresses. When you do, they will appear here.' />
            )}
            <AddAddressModal
                isOpen={modalIsOpen}
                toggleModal={() => setModalIsOpen(false)}
                updateAddresses={updateAddresses}
            />
        </ErrorBoundary>
    )
}

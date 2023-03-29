import { useState } from 'react'

import { LinkedCallout } from '@components/common'
import { MailingListModal } from '@components/modals'
import styles from './NoEvents.module.scss'

export default function NoEvents() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const toggleModal = () => setModalIsOpen(!modalIsOpen)

    return (
        <ul className={styles.noEvents}>
            <LinkedCallout
                caption='Sign up to learn about new events as they’re scheduled.'
                toggleModal={toggleModal}
            />
            <MailingListModal isOpen={modalIsOpen} toggleModal={toggleModal} />
        </ul>
    )
}

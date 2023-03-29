import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { useBrowserStatus } from '@lib/use-browser-status'

import MailingListForm from './MailingListForm'
import CloseModal from '../CloseModal'
import styles from './MailingList.module.scss'

export default function MailingList({ isOpen, isPreowned, toggleModal }) {
    const isBrowser = useBrowserStatus()

    if (isBrowser) {
        Modal.setAppElement(document.body)
    }

    return (
        <Modal
            id='mailing_list_form_modal'
            isOpen={isOpen}
            className={'modal modal--pow modal--small'}
            closeTimeoutMS={100}
            contentLabel='Subscribe'
            onRequestClose={toggleModal}
            bodyOpenClassName={'has-activeModal'}
            portalClassName={'modals'}
            style={{
                overlay: {
                    background: 'rgba(51, 51, 51, 0.95)',
                    zIndex: '200',
                },
                content: {
                    display: 'block',
                    opacity: '1',
                    visibility: 'visible',
                },
            }}
        >
            <section>
                <CloseModal onClick={toggleModal} />
                <div className={styles.container}>
                    <MailingListForm context='modal' isPreowned={isPreowned} />
                </div>
            </section>
        </Modal>
    )
}

MailingList.propTypes = {
    isOpen: PropTypes.bool,
    isPreowned: PropTypes.bool,
    toggleModal: PropTypes.func,
}

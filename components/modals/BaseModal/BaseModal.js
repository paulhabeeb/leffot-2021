import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { useBrowserStatus } from '@lib/use-browser-status'

import CloseModal from '../CloseModal'
import styles from './BaseModal.module.scss'

export default function BaseModal({
    children,
    id,
    isOpen,
    label,
    toggleModal,
    width,
}) {
    const isBrowser = useBrowserStatus()

    if (isBrowser) {
        Modal.setAppElement(document.body)
    }

    return (
        <Modal
            id={id}
            isOpen={isOpen}
            closeTimeoutMS={100}
            contentLabel={label}
            onRequestClose={toggleModal}
            bodyOpenClassName={'has-activeModal'}
            portalClassName={'modals'}
            style={{
                overlay: {
                    alignItems: 'flex-start',
                    background:
                        'rgba(51, 51, 51, 0.95) none repeat scroll 0% 0%',
                    bottom: 0,
                    display: 'flex',
                    left: 0,
                    justifyContent: 'center',
                    WebkitOverflowScrolling: 'touch',
                    overflow: 'auto',
                    padding: '50px 16px',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    transition: 'opacity 100ms ease-in-out',
                    zIndex: 1005,
                },
                content: {
                    backgroundColor: 'var(--color-white)',
                    border: 'none',
                    borderRadius: 0,
                    bottom: 0,
                    boxShadow: 'none',
                    flexGrow: 1,
                    left: 0,
                    margin: 'auto',
                    maxWidth: width,
                    outline: 'none',
                    overflow: 'hidden',
                    padding: 0,
                    position: 'relative',
                    scrollBehavior: 'smooth',
                    right: 0,
                    top: 0,
                    width: '100%',
                },
            }}
        >
            <section>
                <CloseModal onClick={toggleModal} />
                <div className={styles.container}>{children}</div>
            </section>
        </Modal>
    )
}

BaseModal.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    label: PropTypes.string,
    toggleModal: PropTypes.func,
    width: PropTypes.number,
}

BaseModal.defaultProps = {
    id: 'mailing_list_form_modal',
}

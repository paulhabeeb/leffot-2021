import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'
import { useBrowserStatus } from '@lib/use-browser-status'

import CloseModal from '../CloseModal'
import ExpandedGalleryCarousel from './ExpandedGalleryCarousel'
import styles from './ExpandedGallery.module.scss'

export default function ExpandedGallery({ toggleModal, variant }) {
    const isBrowser = useBrowserStatus()

    if (isBrowser) {
        Modal.setAppElement(document.body)
    }

    if (!variant) {
        return null
    }

    return (
        <Modal
            id='expanded_gallery_modal'
            isOpen={variant !== null}
            closeTimeoutMS={100}
            contentLabel='Image Gallery'
            onRequestClose={toggleModal}
            bodyOpenClassName={'has-activeModal'}
            portalClassName={'modals'}
            style={{
                overlay: {
                    background: 'rgba(51, 51, 51, 0.95)',
                    zIndex: '200',
                },
                content: {
                    bottom: '0',
                    display: 'block',
                    left: '0',
                    opacity: '1',
                    position: 'fixed',
                    right: '0',
                    top: '0',
                    visibility: 'visible',
                },
            }}
        >
            <section className={styles.container}>
                <CloseModal onClick={toggleModal} />
                <ExpandedGalleryCarousel variant={variant} />
                <div className={styles.sidebar}>
                    <PrismicRichText field={variant.primary.specs} />
                </div>
            </section>
        </Modal>
    )
}

ExpandedGallery.propTypes = {
    toggleModal: PropTypes.func,
    variant: PropTypes.object,
}

import { useState } from 'react'
import PropTypes from 'prop-types'

import ExpandedGallery from '@components/modals/ExpandedGallery'
import GalleryImage from './GalleryImage'
import styles from './ArchiveGallery.module.scss'

export default function ArchiveGallery({ archiveGallery }) {
    const [variantGallery, setVariantGallery] = useState(null)
    const toggleModal = () => setVariantGallery(null)

    return (
        <section>
            <div className={styles.header}>
                <h2 className={styles.title} id='inspiration'>
                    Inspiration
                </h2>
                <span>
                    <a className={styles.topLink} href='#top'>
                        Back to top
                    </a>
                </span>
            </div>
            <div className={styles.grid}>
                {archiveGallery.map((slice, index) => {
                    if (slice.slice_type === 'variant') {
                        return (
                            <GalleryImage
                                index={index}
                                key={index}
                                setVariantGallery={setVariantGallery}
                                variant={slice}
                            />
                        )
                    }

                    return null
                })}
            </div>
            <ExpandedGallery
                variant={variantGallery}
                toggleModal={toggleModal}
            />
        </section>
    )
}

ArchiveGallery.propTypes = {
    archiveGallery: PropTypes.array,
}

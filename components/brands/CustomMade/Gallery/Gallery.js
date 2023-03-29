import PropTypes from 'prop-types'
import { PrismicText } from '@prismicio/react'
import { email } from '@lib/data'

import { MasonryGallery } from '@components/common'
import styles from './Gallery.module.scss'

export default function Gallery({ brandName, gallery }) {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>Gallery</h2>
                <p className={styles.paragraph}>
                    Find inspiration for your next{' '}
                    <PrismicText field={brandName} /> order.{' '}
                    <a href={`mailto:${email.main}`}>Contact us</a> with any
                    inquiries.
                </p>
                <MasonryGallery images={gallery} />
            </div>
        </section>
    )
}

Gallery.propTypes = {
    brandName: PropTypes.array,
    gallery: PropTypes.array,
}

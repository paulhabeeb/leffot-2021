import PropTypes from 'prop-types'
import Image from "next/legacy/image"
import { PrismicRichText } from '@prismicio/react'

import styles from './GalleryImage.module.scss'

export default function GalleryImage({ caption, image }) {
    return (
        <div>
            <Image
                alt={image?.alt || ''}
                blurDataURL={image.base64}
                height={image.dimensions.height}
                placeholder='blur'
                src={image.url}
                width={image.dimensions.width}
            />
            {caption.length > 0 && (
                <div className={styles.caption}>
                    <PrismicRichText field={caption} />
                </div>
            )}
        </div>
    )
}

GalleryImage.propTypes = {
    caption: PropTypes.array,
    image: PropTypes.object,
}

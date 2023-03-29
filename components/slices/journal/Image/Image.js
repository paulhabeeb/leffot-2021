import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import styles from './Image.module.scss'

export default function Image({ caption, image }) {
    const { alt, xxlarge, xlarge, large, medium, small, xsmall } = image

    const srcset = `${xxlarge.url} 2000w, ${xlarge.url} 1600w, ${large.url} 1366w, ${medium.url} 1024w, ${small.url} 768w, ${xsmall.url} 640w`

    return (
        <figure className={styles.container}>
            <img
                alt={alt || ''}
                decoding='async'
                height={large?.dimensions?.height}
                loading='lazy'
                src={large.url}
                srcSet={srcset}
                width={large?.dimensions?.width}
            />
            {caption && (
                <figcaption className={styles.caption}>
                    <PrismicRichText field={caption} />
                </figcaption>
            )}
        </figure>
    )
}

Image.propTypes = {
    caption: PropTypes.array,
    image: PropTypes.object,
}

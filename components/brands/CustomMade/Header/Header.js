import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import styles from './Header.module.scss'

export default function Header({ caption, image, title }) {
    if (title.length < 1 || title[0].text === '') return null

    return (
        <section className={styles.heading}>
            <div className={styles.flexElement}>
                <PrismicRichText field={title} />
                {caption && <PrismicRichText field={caption} />}
            </div>
            {image?.dimensions && (
                <div className={styles.flexElement}>
                    <img
                        alt={image.alt}
                        height={image.dimensions.height}
                        src={image.url}
                        width={image.dimensions.width}
                    />
                </div>
            )}
        </section>
    )
}

Header.propTypes = {
    caption: PropTypes.array,
    image: PropTypes.object,
    title: PropTypes.array,
}

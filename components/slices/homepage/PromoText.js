import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'

import cn from 'classnames'
import styles from './PromoText.module.scss'

export default function PromoText({ caption, size, title }) {
    const titleStyles = cn(styles.title, { [styles.large]: size === 'large' })

    return (
        <>
            <h1 className={titleStyles}>{asText(title)}</h1>
            <div className={styles.caption}>
                <PrismicRichText field={caption} />
            </div>
        </>
    )
}

PromoText.propTypes = {
    caption: PropTypes.array.isRequired,
    size: PropTypes.string,
    title: PropTypes.array.isRequired,
}

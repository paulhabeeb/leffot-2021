import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'
import cn from 'classnames'

import styles from './Text.module.scss'

export default function Text({ backgroundImages, caption, children, title }) {
    const hasBackgroundImage = backgroundImages !== null

    const container = cn(styles.container, {
        [styles.hasBackgroundImage]: hasBackgroundImage,
    })

    return (
        <div className={container}>
            <div className={styles.title}>
                <PrismicRichText field={title} />
            </div>
            <div className={styles.caption}>
                <PrismicRichText field={caption} />
            </div>
            {children}
        </div>
    )
}

Text.propTypes = {
    backgroundImages: PropTypes.array,
    caption: PropTypes.array,
    children: PropTypes.node,
    title: PropTypes.array,
}

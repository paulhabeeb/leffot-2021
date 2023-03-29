import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import cn from 'classnames'
import styles from './Banner.module.scss'

export default function Banner({ banner, type }) {
    if (!banner?.data) {
        return null
    }

    const className = cn({
        [styles.siteBanner]: type === 'banner',
        [styles.categoryBanner]: type === 'category_banner',
    })

    return (
        <section className={className}>
            <PrismicRichText field={banner.data.text} />
        </section>
    )
}

Banner.propTypes = {
    banner: PropTypes.object,
    type: PropTypes.string,
}

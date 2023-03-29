import PropTypes from 'prop-types'

import { FigureWithMultiply } from '@components/common'
import styles from './ItemImage.module.scss'

export default function ItemImage({ className, image, type }) {
    const imageData = {
        alt: 'Product image coming soon',
        urlOriginal: '/ProductPlaceholder.gif',
    }
    if (image && image.url_standard) {
        imageData.urlOriginal = image.url_standard
        imageData.alt = image.alt
    }
    if (type === 'giftcertificate') {
        imageData.alt = 'Leffot gift card'
        imageData.urlOriginal = '/gift-card.jpg'
    }

    return (
        <div className={styles.container}>
            <div className={className}>
                <FigureWithMultiply images={[imageData]} />
            </div>
        </div>
    )
}

ItemImage.propTypes = {
    className: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    type: PropTypes.string,
}

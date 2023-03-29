import PropTypes from 'prop-types'

import { ShippingBox } from '@components/icons'
import styles from './ShippingEstimate.module.scss'

export default function ShippingEstimate({ product }) {
    return (
        <div className={styles.container}>
            <ShippingBox styles={styles.icon} />
            <div className={styles.caption}>
                Order today, ships {product.releaseDate}
            </div>
        </div>
    )
}

ShippingEstimate.propTypes = {
    product: PropTypes.object,
}

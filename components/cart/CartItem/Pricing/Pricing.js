import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './Pricing.module.scss'

export default function Pricing({ discountedPrice, price }) {
    const hasDiscountedPrice = discountedPrice !== price
    const className = cn(styles.price, {
        [styles.discounted]: hasDiscountedPrice,
    })

    return (
        <>
            <span className='visuallyHidden'>Total</span>
            <span className={className}>{price}</span>
            {hasDiscountedPrice && (
                <span className={styles.price}>{discountedPrice}</span>
            )}
        </>
    )
}

Pricing.propTypes = {
    discountedPrice: PropTypes.string,
    price: PropTypes.string,
}

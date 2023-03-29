import PropTypes from 'prop-types'

import Wrapper from '../Wrapper'
import styles from './PreownedPrice.module.scss'

export default function PreownedPrice({
    basePrice,
    context,
    price,
    retailPrice,
}) {
    return (
        <Wrapper context={context}>
            {retailPrice && (
                <div>
                    <span className={styles.originalPrice}>Original Price</span>
                    <span className='slashPrice'>{retailPrice}</span>
                </div>
            )}
            {basePrice ? (
                <>
                    <div>
                        <span className={styles.ourPrice}>Our Price</span>
                        <span className='slashPrice'>{basePrice}</span>
                    </div>
                    <div>
                        <span className={styles.salePrice}>Sale Price</span>
                        <span className='salePrice'>{price}</span>
                    </div>
                </>
            ) : (
                <div>
                    <span className={styles.ourPrice}>Our Price</span>
                    <span>{price}</span>
                </div>
            )}
        </Wrapper>
    )
}

PreownedPrice.propTypes = {
    basePrice: PropTypes.string,
    context: PropTypes.string,
    price: PropTypes.string,
    retailPrice: PropTypes.string,
}

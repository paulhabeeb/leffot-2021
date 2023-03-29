import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from '@lib/capitalize-first-letter'
import styles from './PreorderPrice.module.scss'

export default function PreorderPrice({ price, retailPrice, releaseDate }) {
    return (
        <dl className={styles.priceGrid}>
            <div>
                <dt>Deposit</dt>
                <dd>{price}</dd>
            </div>
            <div>
                <dt>Full price</dt>
                <dd>{retailPrice}</dd>
            </div>
            <div>
                <dt>Ships</dt>
                <dd>{capitalizeFirstLetter(releaseDate)}</dd>
            </div>
        </dl>
    )
}

PreorderPrice.propTypes = {
    price: PropTypes.string,
    retailPrice: PropTypes.string,
    releaseDate: PropTypes.string,
}

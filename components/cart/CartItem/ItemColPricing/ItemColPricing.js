import PropTypes from 'prop-types'
import styles from './ItemColPricing.module.scss'

export default function ItemColPricing({ children }) {
    return <td className={styles.itemColPricing}>{children}</td>
}

ItemColPricing.propTypes = {
    children: PropTypes.node,
}

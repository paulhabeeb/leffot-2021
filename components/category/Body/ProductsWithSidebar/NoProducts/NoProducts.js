import PropTypes from 'prop-types'
import styles from './NoProducts.module.scss'

export default function NoProducts({ context }) {
    return (
        <div>
            <p className={styles.noProducts}>
                No products match your {context}.
            </p>
        </div>
    )
}

NoProducts.defaultProps = {
    context: 'selection',
}

NoProducts.propTypes = {
    context: PropTypes.string,
}

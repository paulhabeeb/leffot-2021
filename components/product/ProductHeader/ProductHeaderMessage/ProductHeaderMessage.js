import PropTypes from 'prop-types'
import styles from './ProductHeaderMessage.module.scss'

export default function ProductHeaderMessage({ message }) {
    return (
        <div className={styles.container}>
            <span className={styles.message}>{message}</span>
        </div>
    )
}

ProductHeaderMessage.propTypes = {
    message: PropTypes.string,
}

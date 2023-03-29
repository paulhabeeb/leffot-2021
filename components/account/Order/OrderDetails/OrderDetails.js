import PropTypes from 'prop-types'

import styles from './OrderDetails.module.scss'

export default function OrderDetails({ dateCreated, status }) {
    return (
        <ul className={styles.details}>
            <li>
                <span className={styles.title}>Order Placed: </span>
                {dateCreated}
            </li>
            <li>
                <span className={styles.title}>Status: </span>
                {status}
            </li>
        </ul>
    )
}

OrderDetails.propTypes = {
    dateCreated: PropTypes.string,
    status: PropTypes.string,
}

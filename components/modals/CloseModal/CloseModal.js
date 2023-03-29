import PropTypes from 'prop-types'

import styles from './CloseModal.module.scss'

export default function CloseModal({ onClick }) {
    return (
        <button className={styles.button} aria-label='Close' onClick={onClick}>
            <span aria-hidden='true'>×</span>
        </button>
    )
}

CloseModal.propTypes = {
    onClick: PropTypes.func,
}

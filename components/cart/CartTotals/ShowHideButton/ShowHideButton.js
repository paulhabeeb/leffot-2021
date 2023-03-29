import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './ShowHideButton.module.scss'

export default function ShowHideButton({ label, onClick, type }) {
    const className = cn(styles.button, {
        [styles.primary]: type === 'primary',
        [styles.secondary]: type === 'secondary',
    })
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    )
}

ShowHideButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
}

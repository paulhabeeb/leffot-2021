import PropTypes from 'prop-types'

import styles from './ActionButton.module.scss'

export default function ActionButton({
    buttonLabel,
    caption,
    error,
    icon,
    onClick,
}) {
    return (
        <div className={styles.container}>
            {caption && <span className={styles.caption}>{caption}</span>}
            <button className={styles.button} onClick={onClick} type='button'>
                {buttonLabel}
                <span className={styles.icon}>{icon}</span>
            </button>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

ActionButton.propTypes = {
    buttonLabel: PropTypes.string,
    caption: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
}

import PropTypes from 'prop-types'

import styles from './BlockTitle.module.scss'

export default function BlockTitle({ blockTitle, height, onClick }) {
    return (
        <legend className={styles.container}>
            <button
                className={styles.button}
                onClick={onClick}
                onKeyPress={onClick}
                type='button'
            >
                {blockTitle}
            </button>
            <span className={styles.indicator}>{height === 0 ? '+' : '–'}</span>
        </legend>
    )
}

BlockTitle.propTypes = {
    blockTitle: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
}

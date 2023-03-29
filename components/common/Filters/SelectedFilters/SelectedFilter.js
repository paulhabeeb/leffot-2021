import PropTypes from 'prop-types'

import styles from './SelectedFilter.module.scss'

export default function SelectedFilter({ onClick, title }) {
    return (
        <li className={styles.filter}>
            <button className={styles.button} onClick={onClick}>
                <span className={styles.close}>&times;</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: title }} />
            </button>
        </li>
    )
}

SelectedFilter.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
}

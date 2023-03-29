import PropTypes from 'prop-types'

import styles from './SubsectionTitle.module.scss'

export default function SubsectionTitle({ element, title }) {
    switch (element) {
        case 'h1':
            return <h1 className={styles.title}>{title}</h1>
        case 'h2':
            return <h2 className={styles.title}>{title}</h2>
        case 'h3':
            return <h3 className={styles.title}>{title}</h3>
        case 'h4':
            return <h4 className={styles.title}>{title}</h4>
        case 'h5':
            return <h5 className={styles.title}>{title}</h5>
        case 'h6':
            return <h6 className={styles.title}>{title}</h6>
        default:
            return <div className={styles.title}>{title}</div>
    }
}

SubsectionTitle.propTypes = {
    element: PropTypes.string,
    title: PropTypes.string.isRequired,
}

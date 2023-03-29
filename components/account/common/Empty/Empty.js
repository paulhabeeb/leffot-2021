import PropTypes from 'prop-types'

import styles from './Empty.module.scss'

export default function Empty({ caption }) {
    return <p className={styles.container}>{caption}</p>
}

Empty.propTypes = {
    caption: PropTypes.string,
}

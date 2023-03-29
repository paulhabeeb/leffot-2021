import PropTypes from 'prop-types'

import styles from './FlexField.module.scss'

export default function FlexField({ children }) {
    return <div className={styles.container}>{children}</div>
}

FlexField.propTypes = {
    children: PropTypes.node,
}

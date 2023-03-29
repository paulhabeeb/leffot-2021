import PropTypes from 'prop-types'

import styles from './OptionsWrapper.module.scss'

export default function OptionsWrapper({ children }) {
    return <div className={styles.container}>{children}</div>
}

OptionsWrapper.propTypes = {
    children: PropTypes.node,
}

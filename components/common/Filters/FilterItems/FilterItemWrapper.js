import PropTypes from 'prop-types'

import styles from './FilterItemWrapper.module.scss'

export default function FilterItemWrapper({ children }) {
    return <li className={styles.filterItem}>{children}</li>
}

FilterItemWrapper.propTypes = {
    children: PropTypes.node,
}

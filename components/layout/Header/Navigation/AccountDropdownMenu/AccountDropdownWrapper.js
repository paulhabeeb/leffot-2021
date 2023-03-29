import PropTypes from 'prop-types'
import styles from './AccountDropdownWrapper.module.scss'

export default function AccountDropdownWrapper({ children }) {
    return <li className={styles.wrapper}>{children}</li>
}

AccountDropdownWrapper.propTypes = {
    children: PropTypes.node,
}

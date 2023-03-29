import PropTypes from 'prop-types'
import useCustomer from '@framework/use-customer'

import styles from './AccountDropdownMenu.module.scss'
import LoggedInDropdownMenu from './LoggedInDropdownMenu'
import LoggedOutDropdownMenu from './LoggedOutDropdownMenu'

export default function AccountDropdownMenu({ hideMenu }) {
    const { data } = useCustomer()

    return (
        <ul className={styles.mobileCustomerNav}>
            {data ? (
                <LoggedInDropdownMenu hideMenu={hideMenu} />
            ) : (
                <LoggedOutDropdownMenu hideMenu={hideMenu} />
            )}
        </ul>
    )
}

AccountDropdownMenu.propTypes = {
    hideMenu: PropTypes.func,
}

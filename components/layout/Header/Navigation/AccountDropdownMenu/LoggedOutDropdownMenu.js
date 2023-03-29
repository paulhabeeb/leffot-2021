import PropTypes from 'prop-types'
import Link from 'next/link'
import { urls } from '@lib/data'
import AccountDropdownWrapper from './AccountDropdownWrapper'
import styles from './LoggedOutDropdownMenu.module.scss'

export default function LoggedOutDropdownMenu({ hideMenu }) {
    return (
        <AccountDropdownWrapper>
            <Link
                href={urls.auth.login}
                className={styles.link}
                onClick={hideMenu}
            >
                Sign in
            </Link>
            <span className={styles.or}> or </span>
            <Link
                href={urls.auth.create_account}
                className={styles.link}
                onClick={hideMenu}
            >
                Register
            </Link>
        </AccountDropdownWrapper>
    )
}

LoggedOutDropdownMenu.propTypes = {
    hideMenu: PropTypes.func,
}

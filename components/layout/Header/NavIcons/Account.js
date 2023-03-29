import Link from 'next/link'
import useCustomer from '@framework/use-customer'
import { urls } from '@lib/data'

import styles from './NavIcons.module.scss'
import { Account as AccountIcon } from '@components/icons'

export default function Account() {
    const { data } = useCustomer()

    return (
        <li className={styles.navIconAccount}>
            {data ? (
                <Link href={urls.account.index}>
                    <span className='visuallyHidden'>Account</span>
                    <AccountIcon styles={styles.icon} />
                </Link>
            ) : (
                <Link href={urls.auth.login}>
                    <AccountIcon styles={styles.icon} />
                    <span className='visuallyHidden'>Sign in or Register</span>
                </Link>
            )}
        </li>
    )
}

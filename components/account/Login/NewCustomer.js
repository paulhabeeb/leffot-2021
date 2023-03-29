import Link from 'next/link'
import { urls } from '@lib/data'

import styles from './NewCustomer.module.scss'

export default function NewCustomer() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>New to Leffot?</h2>
            <p className={styles.caption}>
                Sign up for speedy checkout, easy order tracking, saved
                addresses, and more.
            </p>
            <Link href={urls.auth.create_account} className={styles.button}>
                <span>Create an account</span>
            </Link>
        </div>
    )
}

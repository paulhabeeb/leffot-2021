import Link from 'next/link'
import { urls } from '@lib/data'

import styles from './Buttons.module.scss'

export default function Checkout() {
    return (
        <Link
            href={urls.checkout.single_address}
            className={styles.checkoutButton}
        >
            Check out
        </Link>
    )
}

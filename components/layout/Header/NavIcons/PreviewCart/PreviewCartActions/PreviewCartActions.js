import Link from 'next/link'
import { urls } from '@lib/data'
import togglePreviewCart from '@lib/toggle-preview-cart'

import styles from './PreviewCartActions.module.scss'

export default function PreviewCartActions() {
    const hideCart = () => {
        togglePreviewCart(false)
    }

    return (
        <div className={styles.container}>
            <div>
                <Link
                    href={urls.checkout.single_address}
                    className={styles.checkoutButton}
                    onClick={hideCart}
                >
                    Check Out
                </Link>
            </div>
            <div>
                <Link
                    href={urls.cart}
                    className={styles.viewCartButton}
                    onClick={hideCart}
                >
                    View and Edit Cart
                </Link>
            </div>
        </div>
    )
}

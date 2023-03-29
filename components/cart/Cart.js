import { CartSkeleton } from '@components/placeholders'
import { SearchForm } from '@components/search'
import CartContext, { useCartContext } from './CartContext'
import CartMain from './CartMain'
import CartSidebar from './CartSidebar'
import styles from './Cart.module.scss'

function CartContents() {
    const {
        cart: { data, error, isEmpty },
        products,
    } = useCartContext()

    if (data === null && error === undefined && isEmpty) {
        return (
            <>
                <p className={styles.cartCaption}>
                    Your cart is empty. Try browsing our shop or searching for
                    an item.
                </p>
                <SearchForm />
            </>
        )
    }

    if ((!data && !error) || !products) {
        return <CartSkeleton />
    }

    if (error) {
        return <p className={styles.cartCaption}>{error}</p>
    }

    if (products?.length < 1) {
        return null
    }

    return (
        <div className={styles.cartWrapper}>
            <CartMain checkout={data} />
            <CartSidebar checkout={data} />
        </div>
    )
}

export default function Cart() {
    return (
        <div className={styles.page}>
            <main id='main' className={styles.pageContent}>
                <h1 className={styles.pageHeading}>Cart</h1>
                <CartContext>
                    <CartContents />
                </CartContext>
            </main>
        </div>
    )
}

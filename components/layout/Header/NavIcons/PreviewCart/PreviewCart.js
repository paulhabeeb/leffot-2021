import dynamic from 'next/dynamic'
import useCart from '@framework/cart/use-cart'

import PreviewCartLoader from './PreviewCartLoader'
import styles from './PreviewCart.module.scss'

const PreviewCartItems = dynamic(() => import('./PreviewCartItems'), {
    loading: function CartLoader() {
        return <PreviewCartLoader />
    },
})

export default function PreviewCart() {
    const { data, isValidating } = useCart()

    return (
        <div className={styles.previewCart} id='previewCartDropdown'>
            <div className={styles.container}>
                {isValidating ? (
                    <PreviewCartLoader />
                ) : (
                    <PreviewCartItems cart={data} maxItems={4} />
                )}
            </div>
        </div>
    )
}

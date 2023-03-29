import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'
import { useCartContext } from '../CartContext'

import CartActions from '../CartActions'
import CartItemsTable from './CartItemsTable'
import SubtotalTop from './SubtotalTop'
import styles from './CartMain.module.scss'

export default function CartMain({ checkout }) {
    const { products } = useCartContext()
    const { price } = usePrice({
        amount: checkout.base_amount,
        currencyCode: checkout.currency.code,
    })

    return (
        <div className={styles.cartMain}>
            <SubtotalTop qty={products.length} subtotal={price} />
            <CartActions location='top' />
            <CartItemsTable
                currencyCode={checkout.currency.code}
                items={products}
                subtotal={price}
            />
        </div>
    )
}

CartMain.propTypes = {
    checkout: PropTypes.object,
}

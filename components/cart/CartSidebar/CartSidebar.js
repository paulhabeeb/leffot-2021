import PropTypes from 'prop-types'

import CartActions from '../CartActions'
import CartTotals from '../CartTotals'
import styles from './CartSidebar.module.scss'

export default function CartSidebar({ checkout }) {
    return (
        <div className={styles.cartSidebarWrapper}>
            <div className={styles.cartSidebar}>
                <CartTotals checkout={checkout} />
                <CartActions />
            </div>
        </div>
    )
}

CartSidebar.propTypes = {
    checkout: PropTypes.object,
}

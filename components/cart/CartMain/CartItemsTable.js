import PropTypes from 'prop-types'

import CartItem from '../CartItem'
import styles from './CartItemsTable.module.scss'

export default function CartItemsTable({ currencyCode, items, subtotal }) {
    const lineItems = []
    items.forEach(item => {
        lineItems.push(
            <CartItem currencyCode={currencyCode} item={item} key={item.id} />
        )
    })

    return (
        <table className={styles.cartItemsTable}>
            <thead className={styles.cartTableHeader}>
                <tr>
                    <th className={styles.cartTableHeaderItem} colSpan='2'>
                        Item
                    </th>
                    <th className={styles.cartTableHeaderItem}>Price</th>
                </tr>
            </thead>
            {lineItems}
            <tfoot className={styles.cartTableFooter}>
                <tr>
                    <td className={styles.cartTableFooterSubtotal} colSpan='4'>
                        {subtotal}
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

CartItemsTable.propTypes = {
    currencyCode: PropTypes.string,
    items: PropTypes.array,
    subtotal: PropTypes.string,
}

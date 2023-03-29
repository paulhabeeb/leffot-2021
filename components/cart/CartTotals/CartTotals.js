import PropTypes from 'prop-types'

import Coupons from './Coupons'
import ShippingEstimator from './ShippingEstimator'
import TotalLine from './TotalLine'
import TotalValue from './TotalValue'
import styles from './CartTotals.module.scss'

export default function CartTotals({ checkout }) {
    return (
        <div>
            <h2 className={styles.totalsHeader}>Total</h2>
            <ul className={styles.totalsList}>
                <TotalLine hasDivider={true} title='Subtotal'>
                    <TotalValue value={checkout.base_amount} />
                </TotalLine>
                <ShippingEstimator {...checkout} />
                {checkout?.taxes?.map((tax, index) => (
                    <TotalLine title={tax.name} key={index}>
                        <TotalValue value={tax.amount} />
                    </TotalLine>
                ))}
                {checkout.discount_amount > 0 && (
                    <TotalLine title='Discount'>
                        <TotalValue value={checkout.discount_amount} />
                    </TotalLine>
                )}
                <Coupons {...checkout} />
                <TotalLine hasDivider={true} title='Grand Total'>
                    <TotalValue size='large' value={checkout.grand_total} />
                </TotalLine>
            </ul>
        </div>
    )
}

CartTotals.propTypes = {
    checkout: PropTypes.object,
}

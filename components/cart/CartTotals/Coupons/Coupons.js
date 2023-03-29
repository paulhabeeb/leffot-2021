import PropTypes from 'prop-types'

import ApplyDiscount from '../ApplyDiscount'
import RemoveDiscount from '../RemoveDiscount'
import TotalLine from '../TotalLine'

export default function Coupons({ coupons, id }) {
    if (coupons.length > 0) {
        return coupons.map(coupon => (
            <RemoveDiscount
                caption={coupon.code}
                checkoutId={id}
                code={coupon.code}
                hasDivider={true}
                key={coupon.code}
                title='Promo Code'
                value={coupon.discounted_amount}
            />
        ))
    }

    return (
        <TotalLine hasDivider={true} title='Promo Code'>
            <ApplyDiscount
                checkoutId={id}
                formName='coupon-code'
                id='couponCode'
                label='Promo Code'
            />
        </TotalLine>
    )
}

Coupons.propTypes = {
    coupons: PropTypes.array,
    id: PropTypes.string,
}

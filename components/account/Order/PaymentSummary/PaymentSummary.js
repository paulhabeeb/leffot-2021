import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'

import { SubsectionTitle } from '@components/common'
import Address from '../Address'
import InfoBlip from '../InfoBlip'
import SectionWrapper from '../SectionWrapper'
import styles from './PaymentSummary.module.scss'

function PriceTotal({ isNegative, label, value }) {
    return (
        <div className={styles.paymentRow}>
            <div>{label}</div>
            <div>
                {isNegative && '−'}
                {value}
            </div>
        </div>
    )
}

PriceTotal.propTypes = {
    isNegative: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
}

export default function PaymentSummary({
    billing_address,
    currency_code,
    discount_amount,
    gift_certificate_amount,
    payment_method,
    shipping_cost_ex_tax,
    subtotal_ex_tax,
    total_inc_tax,
    total_tax,
}) {
    const { price: subtotal } = usePrice({
        amount: parseFloat(subtotal_ex_tax),
        currencyCode: currency_code,
    })
    const { price: discount } = usePrice({
        amount: parseFloat(discount_amount),
        currencyCode: currency_code,
    })
    const { price: giftCertificate } = usePrice({
        amount: parseFloat(gift_certificate_amount),
        currencyCode: currency_code,
    })
    const { price: shipping } = usePrice({
        amount: parseFloat(shipping_cost_ex_tax),
        currencyCode: currency_code,
    })
    const { price: tax } = usePrice({
        amount: parseFloat(total_tax),
        currencyCode: currency_code,
    })
    const { price: total } = usePrice({
        amount: parseFloat(total_inc_tax),
        currencyCode: currency_code,
    })

    const method =
        payment_method === 'giftcertificate' ? 'Gift card' : payment_method

    return (
        <section>
            <SubsectionTitle element='h3' title='Payment Summary' />
            <SectionWrapper>
                {payment_method && payment_method !== '' && (
                    <InfoBlip title='Payment method:'>
                        <div>{method}</div>
                    </InfoBlip>
                )}
                <Address address={billing_address} title='Bills to:' />
                <InfoBlip title='Contact information:'>
                    <div>
                        {billing_address.email && (
                            <div>{billing_address.email}</div>
                        )}
                        {billing_address.phone && (
                            <div>{billing_address.phone}</div>
                        )}
                    </div>
                </InfoBlip>
            </SectionWrapper>
            <div className={styles.payments}>
                <PriceTotal label='Subtotal' value={subtotal} />
                <PriceTotal label='Shipping' value={shipping} />
                <PriceTotal label='Tax' value={tax} />
                {parseInt(discount_amount) > 0 && (
                    <PriceTotal
                        isNegative={true}
                        label='Discount'
                        value={discount}
                    />
                )}
                {parseInt(gift_certificate_amount) > 0 && (
                    <PriceTotal
                        isNegative={true}
                        label='Paid with gift card'
                        value={giftCertificate}
                    />
                )}
                <PriceTotal label='Grand Total' value={total} />
            </div>
        </section>
    )
}

PaymentSummary.propTypes = {
    billing_address: PropTypes.object,
    currency_code: PropTypes.string,
    discount_amount: PropTypes.string,
    gift_certificate_amount: PropTypes.string,
    payment_method: PropTypes.string,
    shipping_cost_ex_tax: PropTypes.string,
    subtotal_ex_tax: PropTypes.string,
    total_inc_tax: PropTypes.string,
    total_tax: PropTypes.string,
}

import PropTypes from 'prop-types'
import Link from 'next/link'
import usePrice from '@framework/use-price'

import Callout from '../Callout'
import DetailItem from '../DetailItem'
import DetailsWrapper from '../DetailsWrapper'
import styles from './Preowned.module.scss'

export default function Preowned({ fields, prices }) {
    let retailPrice = null
    if (prices.retailPrice && prices.retailPrice.value)
        retailPrice = prices.retailPrice.value

    const { price } = usePrice({
        amount: retailPrice,
        currencyCode: prices.price.currencyCode,
    })

    const description = (
        <p>
            This shoe is part of our{' '}
            <Link href='/pre-owned'>pre-owned collection</Link>. Each shoe is
            carefully inspected and verified to be genuine. All pre-owned shoes
            are sold as-is. For more information, read our{' '}
            <Link href='/frequently-asked-questions'>FAQ</Link>.
        </p>
    )
    const conditions = ['New', 'Excellent', 'Very Good', ' Good']

    return (
        <DetailsWrapper>
            <Callout description={description} />
            <div className={styles.list}>
                {fields.pow_condition && (
                    <DetailItem
                        item={{
                            name: 'Condition',
                            value: conditions.map((condition, index) => (
                                <span className={styles.condition} key={index}>
                                    {fields.pow_condition.value ===
                                    condition ? (
                                        <span
                                            className={styles.selectedCondition}
                                        >
                                            {condition}
                                        </span>
                                    ) : (
                                        condition
                                    )}
                                </span>
                            )),
                        }}
                    />
                )}
                {price && (
                    <DetailItem
                        item={{
                            name: 'Original retail price',
                            value: price,
                        }}
                    />
                )}
                {fields.pow_packaging && (
                    <DetailItem item={fields.pow_packaging} />
                )}
                {fields.trees && <DetailItem item={fields.trees} />}
                {fields.features && <DetailItem item={fields.features} />}
                {fields.size_guidance && (
                    <DetailItem item={fields.size_guidance} />
                )}
            </div>
        </DetailsWrapper>
    )
}

Preowned.propTypes = {
    fields: PropTypes.object,
    prices: PropTypes.object,
}

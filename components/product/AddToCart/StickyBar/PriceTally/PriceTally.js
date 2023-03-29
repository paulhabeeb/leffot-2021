import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'
import { corthayUltimatePackageOptions } from '@lib/mto/upcharges'

import { MTOFee } from '@components/product/price'
import ShippingEstimate from '../ShippingEstimate'
import TallyItem from './TallyItem'
import styles from './PriceTally.module.scss'

function checkShouldInclude(item, checkboxToggleState) {
    // When ultimate package or black edition are selected,
    // exclude leather, lining, piping, and sole from the tally list
    if (
        (checkboxToggleState['ultimate package'] ||
            checkboxToggleState['black edition']) &&
        corthayUltimatePackageOptions.includes(item)
    ) {
        return false
    }

    return true
}

function createTallys(checkboxToggleState, brandName) {
    const tallys = []

    if (checkboxToggleState !== null) {
        let i = 0
        for (const key in checkboxToggleState) {
            if (
                Object.prototype.hasOwnProperty.call(checkboxToggleState, key)
            ) {
                const shouldInclude = checkShouldInclude(
                    key,
                    checkboxToggleState
                )

                if (checkboxToggleState[key] && shouldInclude) {
                    tallys.push(
                        <TallyItem name={key} brandName={brandName} key={i} />
                    )
                    i++
                }
            }
        }
    }

    return tallys
}

export default function PriceTally({
    checkboxToggleState,
    priceComponent,
    product,
}) {
    const { brand, fields } = product
    const basePrice = usePrice({
        amount: product.prices.basePrice.value,
        currencyCode: product.prices.basePrice.currencyCode,
    })

    // Some random products don't have brands, and the brand name is essential
    // to this component
    if (!brand.name) {
        return <div className={styles.container}>{priceComponent}</div>
    }

    const brandName = brand.name.toLowerCase()
    const tallys = createTallys(checkboxToggleState, brandName)

    return (
        <div className={styles.container}>
            {tallys.length > 0 ? (
                <dl className={styles.tallyItemWrapper}>
                    <TallyItem
                        name='Base price'
                        brandName={brandName}
                        basePrice={basePrice.price}
                    />
                    {tallys}
                    <div className='tally-wrapper tally-total'>
                        <dt>Total</dt>
                        <dd>{priceComponent}</dd>
                    </div>
                </dl>
            ) : (
                <div className={styles.price}>{priceComponent}</div>
            )}
            <div className={styles.mto}>
                <MTOFee context='product' fields={fields} />
            </div>
            <ShippingEstimate product={product} />
        </div>
    )
}

PriceTally.propTypes = {
    checkboxToggleState: PropTypes.object,
    priceComponent: PropTypes.element,
    product: PropTypes.object,
}

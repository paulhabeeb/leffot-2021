import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'

import ArchiveColl from '../ArchiveColl'
import LastPairsPrice from '../LastPairsPrice'
import NormalPrice from '../NormalPrice'
import PreorderBalancePrice from '../PreorderBalancePrice'
import PreorderPrice from '../PreorderPrice'
import PreownedPrice from '../PreownedPrice'

export default function Factory({
    availabilityV2,
    context,
    fields,
    isArchiveColl,
    isLastPairs,
    isPreorder,
    isPreorderBalance,
    isPreowned,
    prices,
}) {
    // Some products have upcharges if you select certain options,
    // and if those upcharge options are selected by default, the price
    // reflects it. But we want to display the lowest possible price, so
    // if basePrice (the price without upcharges) is lower than price
    // (the price possibly with upcharges), then we go with the lower one.
    let price = prices.price.value
    if (prices.basePrice.value < price && context === 'category') {
        price = prices.basePrice.value
    }
    // If a product is on sale, BC's default pricing has prices.price as the sale
    // price and prices.basePrice as the original price. But once a user selects a
    // variant (e.g., a size or color), prices.price becomes the original price,
    // and only prices.salePrice has the discounted price. We have to set price
    // to prices.salePrice or else the discounted price will disappear from the
    // frontend once the user selects a variant.
    if (prices?.salePrice?.value < price && context === 'product') {
        price = prices.salePrice.value
    }

    const pricing = usePrice({
        amount: price,
        baseAmount: prices.basePrice.value,
        currencyCode: prices.price.currencyCode,
    })

    // retailPrice gives us the full price for pre-orders and pre-owned shoes
    const retailPrice = prices?.retailPrice?.value

    const retailPricing = usePrice({
        amount: retailPrice,
        currencyCode: prices.price.currencyCode,
    })

    const isUnavailablePreorder =
        fields?.product_type?.value === 'Pre-order' && !isPreorder

    if (isLastPairs) {
        return <LastPairsPrice context={context} price={pricing.price} />
    }
    if (isPreowned && context === 'category') {
        return (
            <PreownedPrice
                basePrice={pricing.basePrice}
                price={pricing.price}
                retailPrice={retailPricing.price}
                context={context}
            />
        )
    }
    if (isPreorderBalance && context === 'product') {
        return (
            <PreorderBalancePrice
                balance={pricing.price}
                deposit={fields.pre_deposit.value}
                fullPrice={retailPricing.price}
            />
        )
    }
    if (isPreorder && context === 'product') {
        return (
            <PreorderPrice
                price={pricing.price}
                retailPrice={retailPricing.price}
                releaseDate={availabilityV2.message}
            />
        )
    }
    if (isArchiveColl && context === 'category') {
        return <ArchiveColl context={context} price={pricing.price} />
    }

    return (
        <NormalPrice
            price={pricing.price}
            basePrice={pricing.basePrice}
            fields={fields}
            isArchiveColl={isArchiveColl}
            isPreorder={isPreorder || isUnavailablePreorder}
            context={context}
        />
    )
}

Factory.propTypes = {
    availabilityV2: PropTypes.object,
    context: PropTypes.string,
    fields: PropTypes.object,
    isArchiveColl: PropTypes.bool,
    isLastPairs: PropTypes.bool,
    isPreorder: PropTypes.bool,
    isPreorderBalance: PropTypes.bool,
    isPreowned: PropTypes.bool,
    prices: PropTypes.object,
}

const calculatePrice = ({ prices, productOptions, selectedValues }) => {
    let priceAdjustment = 0

    Object.entries(selectedValues).forEach(([key, rawValue]) => {
        const option = productOptions.find(
            opt => opt.entityId.toString() === key
        )
        const isBool = typeof rawValue === 'boolean'
        const value = isBool ? rawValue : rawValue.toString()

        if (option) {
            if (option.__typename === 'CheckboxOption') {
                const yesAdjuster =
                    option?.adjusters?.value?.price?.adjuster_value
                const noAdjuster =
                    option?.adjusters?.noValue?.price?.adjuster_value

                // Checkboxes that are displayed to the user on the frontend
                // are stored in selectedValues as booleans. Checkboxes that
                // aren't displayed, like all the checkbox toggles for the
                // archive shoes, are stored in selectedValues as Numbers or
                // Strings. So we have to compare both.
                if (
                    yesAdjuster &&
                    ((isBool && value) || value === option.value.toString())
                ) {
                    priceAdjustment +=
                        option.adjusters.value.price.adjuster_value
                } else if (
                    noAdjuster &&
                    ((isBool && !value) || value === option.noValue.toString())
                ) {
                    priceAdjustment +=
                        option.adjusters.noValue.price.adjuster_value
                }
            } else if (option?.values) {
                const optionValue = option.values.find(
                    val => val.entityId.toString() === value
                )

                if (optionValue?.adjusters?.price) {
                    priceAdjustment +=
                        optionValue.adjusters.price.adjuster_value
                }
            }
        }
    })

    const updatedBasePrice = prices.basePrice.value + priceAdjustment

    const newPrices = {
        ...prices,
        price: {
            ...prices.price,
            value: updatedBasePrice,
        },
    }

    return newPrices
}

export default calculatePrice

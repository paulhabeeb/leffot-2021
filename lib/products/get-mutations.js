import getAvailableOptions from './get-available-options'
import getVariant from './get-variant'

export const getSelectedValues = (selectedValues, options) => {
    const inventoryTrackedSelectedValues = {}
    const untrackedSelectedValues = []

    Object.entries(selectedValues).forEach(([selOpt, rawSelVal]) => {
        let selVal = rawSelVal

        const optionIndex = options.findIndex(
            opt => opt.entityId.toString() === selOpt
        )
        const option = options[optionIndex]

        // If we're adding a checkbox option (or anything else that uses a
        // bool in Formik, get the proper variant ID from the option
        if (typeof rawSelVal === 'boolean') {
            selVal = rawSelVal ? option.value : option.noValue
        }

        if (!option.isVariantOption) {
            untrackedSelectedValues.push({
                option_id: selOpt,
                option_value: selVal.toString(),
            })
        } else {
            inventoryTrackedSelectedValues[selOpt] = selVal
        }
    })

    return { inventoryTrackedSelectedValues, untrackedSelectedValues }
}

const getMutations = ({
    hasVariantInventory,
    options,
    selectedValues = null,
    variants,
}) => {
    // Products that don't have variants (e.g., archive products that only have
    // customizations and not variants) obviously shouldn't return a variant.
    // They also shouldn't return an updated options array because the point of
    // doing that is to restrict the stock availability of various option combos.
    // And products with no variants are not stock tracked.
    if (variants.length <= 1) {
        return {
            newAvailableOptions: options,
            variant: null,
        }
    }

    const { inventoryTrackedSelectedValues } = getSelectedValues(
        selectedValues,
        options
    )

    const selectedVariant = getVariant(variants, inventoryTrackedSelectedValues)
    const newAvailableOptions = getAvailableOptions({
        hasVariantInventory,
        options,
        variants,
        selectedValues: inventoryTrackedSelectedValues,
    })

    return {
        newAvailableOptions,
        variant: selectedVariant,
    }
}

export default getMutations

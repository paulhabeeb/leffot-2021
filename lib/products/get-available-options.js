import { DROPDOWN_INITIAL_VALUE } from '@lib/products/initialize-form-values'

const getValuesStates = (option, variants, selectedValues) => {
    return option.values.map(value => {
        // See if at least one in-stock variant contains this option
        // and, if necessary, any selected options
        const enabled = variants.some(variant => {
            const trackInventory = variant?.inventory !== null
            const isInStock = trackInventory && variant?.inventory?.isInStock

            if (!isInStock) {
                return false
            }

            // If the option doesn't control inventory, then we don't ever
            // need to disable it
            if (!trackInventory || !option.isVariantOption) {
                return true
            }

            // Match the variant's product options with the current option and the selected options
            for (let i in variant.productOptions) {
                const varOpt = variant.productOptions[i]

                // If this is a watch strap and we're looping through color, see if this
                // variant option is also color
                if (varOpt.entityId === option.entityId) {
                    // Each variant product option has an array of its values, but there's always only
                    // a single value there, i.e., the array length is always 1. So we check to see if
                    // value is equal to to the value we're looping. I.e., if we're on the color option
                    // and black is selected, is this variant option value also black? If not, disable
                    // this variant.
                    if (varOpt.values[0].entityId !== value.entityId) {
                        return false
                    }
                } else if (
                    selectedValues?.[varOpt.entityId] &&
                    selectedValues[varOpt.entityId] !== '' &&
                    selectedValues[varOpt.entityId] !==
                        DROPDOWN_INITIAL_VALUE &&
                    selectedValues[varOpt.entityId] !==
                        varOpt.values[0].entityId.toString()
                ) {
                    // If this variant option is not color but instead is size or width or anything else.
                    // And if selected values has this variant option ID as a possibility. And if the
                    // variant option has a selected value, that value must be equal to this variant's
                    // value, or else we disable the variant.
                    return false
                }
            }

            // If all other checks fail, then we can enable the variant!
            return true
        })

        return {
            ...value,
            disabled: !enabled,
        }
    })
}

const getAvailableOptions = ({
    hasVariantInventory,
    options,
    selectedValues = {},
    variants,
}) => {
    // Products that *do* have variants but which are not stock tracked should return
    // only the variant and not an updated options array for reasons outlined above.
    if (!hasVariantInventory) {
        return options
    }

    return options.map(option => {
        // Some option types, like text box, don't have values, so we
        // obviously don't want to try to set them or loop through them
        if (!option?.values) {
            return option
        }

        const values = getValuesStates(option, variants, selectedValues)

        return {
            ...option,
            values,
        }
    })
}

export default getAvailableOptions

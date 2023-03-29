const getVariant = (variants, selectedValues) => {
    let selectedVariant = null

    variants.forEach(variant => {
        const matches = variant.productOptions.every(option => {
            return option.values.every(value => {
                return Object.values(selectedValues).includes(
                    value.entityId.toString()
                )
            })
        })

        if (matches) {
            selectedVariant = variant
        }
    })

    return selectedVariant
}

export default getVariant

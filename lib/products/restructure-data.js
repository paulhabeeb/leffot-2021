import cleanOptionName from '@lib/clean-option-name'
import getAvailableOptions from './get-available-options'

const titles = {
    color: 'Color',
    dimensions: 'Dimensions',
    features: 'Features',
    ingredients: 'Ingredients',
    last: 'Last',
    size: 'Size',
    size_guidance: 'Sizing',
    style: 'Style',
    trees: 'Shoe trees',
    pow_condition: 'Condition',
    pow_packaging: 'Packaging',
    pow_original_price: 'Original retail price',
    watch_box_papers: 'Box/Papers',
    watch_case: 'Case',
    watch_crystal: 'Crystal',
    watch_dial: 'Dial',
    watch_dimensions: 'Dimensions',
    watch_movement: 'Movement',
    watch_reference: 'Reference',
    watch_strap: 'Strap',
    watch_year: 'Year',
}

const addDisabledAttributeToOptionValues = options => {
    const updatedOptions = []

    options.forEach(option => {
        if (option.values) {
            const newValues = addDisabledAttributeToOptionValues(option.values)
            updatedOptions.push({
                ...option,
                values: [...newValues],
            })
        } else {
            updatedOptions.push({
                ...option,
                disabled: false,
            })
        }
    })

    return updatedOptions
}

const convertIdsToNames = options => {
    const names = {}

    options.forEach(option => {
        const formattedName = cleanOptionName(option.displayName.toLowerCase())
        const values = {}

        if (option.values) {
            option.values.forEach(value => {
                values[value.entityId] = value.label
            })
        }

        if (option.value) {
            if (option.__typename === 'CheckboxOption') {
                values.yes = option.value
                values.no = option.noValue
            }
        }

        if (option.__typename === 'TextFieldOption' && option.defaultValue) {
            values.prefill = option.defaultValue
        }

        names[option.entityId] = {
            name: formattedName,
            values,
        }
    })

    return names
}

const getOptionsFromKey = (product, key) => {
    if (product.fields && product.fields[key]) {
        return product.fields[key].value
    }

    return null
}

const restructureCustomFields = customFields => {
    // Returns an object of custom fields with each field's name as the key
    const newFields = {}

    customFields.forEach(fieldObject => {
        const { name, value } = fieldObject
        let newValue = value

        if (name === 'black_edition') {
            newValue = JSON.parse(value)
        }

        if (name === 'default_options') {
            newValue = JSON.parse(value)

            // If this is the second instance of default_options, merge it with the first instead of overwriting
            if (
                Object.prototype.hasOwnProperty.call(
                    newFields,
                    'default_options'
                )
            ) {
                const combinedValues = { ...newFields.default_options.value }
                const existingKeys = Object.keys(
                    newFields.default_options.value
                )

                for (const option in newValue) {
                    if (existingKeys.includes(option)) {
                        combinedValues[option] = [
                            ...combinedValues[option],
                            ...newValue[option],
                        ]
                    } else {
                        combinedValues[option] = newValue[option]
                    }
                }

                newValue = combinedValues
            }
        }

        newFields[name] = {
            name: titles[name] || null,
            value: newValue,
        }
    })

    return newFields
}

const stripEdgesAndNode = object => {
    if (!object?.edges) {
        return object
    }

    const newArray = []

    object.edges.forEach(edge => {
        const newItem = {}

        Object.keys(edge.node).forEach(key => {
            newItem[key] = edge.node[key]

            if (
                edge.node[key] != null &&
                Object.prototype.hasOwnProperty.call(edge.node[key], 'edges')
            ) {
                newItem[key] = stripEdgesAndNode(edge.node[key])
            }
        })

        newArray.push(newItem)
    })

    return newArray
}

const re = /(#[0-z]{1,50} )/

export const formatProductTitle = title => {
    let newTitle = title.replace(re, '')

    const index = title.indexOf('Gift Certificate')
    if (index > -1)
        newTitle = newTitle
            .slice(index)
            .replace('Gift Certificate', 'Gift Card')

    return newTitle
}

const sortSwatchValues = values => {
    const optionMap = []
    const newValues = [...values]

    // Loop through all values (#Calf Dark Oak, #Suede Mink)
    // and split the material from the color
    for (let i = 0; i < newValues.length; i++) {
        const newValue = newValues[i]
        const splitLabel = newValue.label.split(re)

        newValue.label = splitLabel[2]
        newValue.image.alt = splitLabel[2]
        newValue.optionName = splitLabel[1]
            .replace('_', ' ')
            .replace(/(#)/, '')
            .trim()
        newValues[i] = newValue

        // Add the material to the option map, if it's not there already
        if (!optionMap.includes(newValue.optionName)) {
            optionMap.push(newValue.optionName)
        }
    }

    // An array of options we'll return at the end
    const retOptions = []

    // Create the final array by looping through the available
    // materials (suede, calf) and matching them to the
    // corresponding labels (mink, dark oak)
    optionMap.forEach(option => {
        const retOption = {
            display_name: option,
            values: [],
        }

        newValues.forEach(value => {
            const newValue = value
            if (option === newValue.optionName) {
                delete newValue.optionName
                retOption.values.push(newValue)
            }
        })
        retOptions.push(retOption)
    })

    return retOptions
}

const mergeProductOptions = (productOptions, modifiers) => {
    const hasModifiers = modifiers != null && modifiers.length > 0

    return productOptions.map(option => {
        if (option?.values) {
            let newValues = [...option.values]

            if (
                option.partial === 'swatch' &&
                option.display_name === 'Leather'
            ) {
                newValues = sortSwatchValues(newValues)
            }

            if (hasModifiers) {
                newValues = option.values.map(val => {
                    const mod = modifiers.find(
                        modd => modd.id === option.entityId
                    )

                    if (mod) {
                        let adjusters = null

                        mod.option_values.forEach(optVal => {
                            if (optVal.id === val.entityId) {
                                adjusters = optVal.adjusters
                            }
                        })

                        return {
                            ...val,
                            adjusters,
                        }
                    }

                    return val
                })
            }

            return {
                ...option,
                values: newValues,
            }
        } else if (option.__typename === 'CheckboxOption' && hasModifiers) {
            const mod = modifiers.find(modd => modd.id === option.entityId)

            let value = null
            let noValue = null
            let adjusters = {}

            mod.option_values.forEach(opt => {
                if (opt.value_data.checked_value) {
                    value = opt.id
                    adjusters.value = opt.adjusters
                } else {
                    noValue = opt.id
                    adjusters.noValue = opt.adjusters
                }
            })

            return {
                ...option,
                adjusters,
                value,
                noValue,
            }
        }

        return option
    })
}

const restructureProductData = (product, modifiers = null) => {
    const newProduct = { ...product, cardType: 'product' }

    if (newProduct.relatedProducts) {
        const rawRelatedProducts = stripEdgesAndNode(newProduct.relatedProducts)

        newProduct.relatedProducts = rawRelatedProducts.map(relatedProduct =>
            restructureProductData(relatedProduct)
        )
    }

    if (newProduct.name) {
        newProduct.name = formatProductTitle(newProduct.name)
    }
    if (newProduct.title) {
        newProduct.title = formatProductTitle(newProduct.title)
    }

    if (newProduct.categories) {
        newProduct.categories = stripEdgesAndNode(newProduct.categories)
    }

    if (newProduct.variants) {
        newProduct.variants = stripEdgesAndNode(newProduct.variants)
    }

    if (newProduct.productOptions) {
        newProduct.productOptions = stripEdgesAndNode(newProduct.productOptions)
        newProduct.productOptions = mergeProductOptions(
            newProduct.productOptions,
            modifiers
        )

        newProduct.productOptions = getAvailableOptions({
            hasVariantInventory: newProduct.inventory.hasVariantInventory,
            options: newProduct.productOptions,
            variants: newProduct.variants,
        })
    }

    if (newProduct.images) {
        newProduct.images = stripEdgesAndNode(newProduct.images)
    }

    newProduct.fields = {}
    if (newProduct.customFields) {
        const strippedEdges = stripEdgesAndNode(newProduct.customFields)

        newProduct.fields = restructureCustomFields(strippedEdges)
        delete newProduct.customFields
    }

    newProduct.releaseDate = null
    if (
        newProduct.availabilityV2 &&
        newProduct.availabilityV2.message &&
        newProduct.availabilityV2.message !== ''
    ) {
        newProduct.releaseDate = newProduct.availabilityV2.message
    }

    newProduct.isAvailable = false
    if (
        newProduct?.availabilityV2?.status === 'Available' ||
        newProduct?.availabilityV2?.status === 'Preorder'
    ) {
        newProduct.isAvailable = true
    }

    newProduct.isPreorder = newProduct?.availabilityV2?.status === 'Preorder'
    if (newProduct.isPreorder) {
        const now = new Date()
        const preorderLiveDate = newProduct?.fields?.pre_dateEnable
            ? new Date(newProduct.fields.pre_dateEnable.value)
            : null
        const preorderStatus = newProduct?.fields?.pre_status
            ? newProduct.fields.pre_status.value
            : null

        if (
            preorderStatus === 'live' &&
            ((preorderLiveDate !== null &&
                preorderLiveDate.getTime() <= now.getTime()) ||
                preorderLiveDate === null)
        ) {
            newProduct.isPreorderAvailable = true
        }
    }

    newProduct.isPreorderBalance =
        newProduct?.fields?.pre_status?.value === 'balance'
    newProduct.isPreowned =
        newProduct?.fields?.product_type?.value === 'Pre-owned'
    newProduct.isWatch = newProduct?.fields?.product_type?.value === 'Watches'
    newProduct.isExclusive = newProduct?.fields?.exclusive?.value === 'Yes'
    newProduct.isOnlineExclusive =
        newProduct?.fields?.online_exclusive?.value === 'Yes'
    newProduct.isArchiveColl =
        newProduct?.fields?.archive_collection?.value === 'Yes'
    newProduct.archiveData = null
    newProduct.showWaitlistMessage =
        newProduct?.fields?.showWaitlistMessage?.value === 'Yes'
    newProduct.isLastPairs =
        newProduct?.fields?.last_pairs?.value === 'Last Pair'

    if (newProduct.isArchiveColl) {
        newProduct.isPreorder = false

        if (newProduct.productOptions) {
            const optionNames = convertIdsToNames(newProduct.productOptions)
            const defaultOptions = getOptionsFromKey(
                newProduct,
                'default_options'
            )
            const blackEditionOptions = getOptionsFromKey(
                newProduct,
                'black_edition'
            )

            newProduct.archiveData = {
                blackEditionOptions,
                defaultOptions,
                optionNames,
            }

            const updatedOptions = addDisabledAttributeToOptionValues(
                newProduct.productOptions
            )
            newProduct.productOptions = [...updatedOptions]
        }
    }

    return newProduct
}

export default restructureProductData

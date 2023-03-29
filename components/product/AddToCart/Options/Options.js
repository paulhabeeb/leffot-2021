import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import calculatePrice from '@lib/products/calculate-price'
import getMutations from '@lib/products/get-mutations'
import {
    corthayCheck,
    getHasSpecificOption,
    updateToePlates,
} from '@lib/products/options'

import {
    HandleChangeContextProvider,
    useProductContext,
} from '@components/product'
import Factory from './Factory'

export default function Options({
    checkboxToggles,
    checkboxToggleState,
    product,
    setCheckboxToggleState,
}) {
    const { setValues, values } = useFormikContext()
    const {
        availableOptions,
        defaultImage,
        setAvailableOptions,
        setDefaultImage,
        setImageIsLoading,
        setPrices,
    } = useProductContext()

    const hasToePlatesOption = getHasSpecificOption(
        'Toe Plates',
        product.productOptions,
        true
    )

    const handleOptionChange = (name, value) => {
        // Allow values to be deselected
        const currentValue = values[name].toString()
        const newValue = value.toString()
        const updatedValue = currentValue !== newValue ? newValue : ''

        let newSelections = {
            ...values,
            [name]: updatedValue,
        }

        let updatedAvailableOptions = [...availableOptions]

        if (product.isArchiveColl) {
            let newCheckboxToggleState = { ...checkboxToggleState }

            // Disable toe plates if need be.
            if (hasToePlatesOption) {
                const {
                    platesAreSelected,
                    updatedProductOptions,
                    updatedSelections,
                } = updateToePlates({
                    productOptions: product.productOptions,
                    selections: newSelections,
                })

                newSelections = {
                    ...newSelections,
                    ...updatedSelections,
                }

                updatedAvailableOptions = [...updatedProductOptions]

                if (newCheckboxToggleState?.['toe plates']) {
                    newCheckboxToggleState = {
                        ...newCheckboxToggleState,
                        'toe plates': platesAreSelected,
                    }
                }
            }

            if (product.brand.name === 'Corthay') {
                const {
                    shouldUpdateProduct,
                    updatedCheckboxToggleState,
                    updatedProductOptions,
                    updatedSelections,
                } = corthayCheck(
                    product.archiveData,
                    product.productOptions,
                    name,
                    updatedValue,
                    newSelections,
                    checkboxToggles,
                    {
                        current: checkboxToggleState,
                        next: newCheckboxToggleState,
                    }
                )

                if (shouldUpdateProduct) {
                    updatedAvailableOptions = [...updatedProductOptions]
                }
                newSelections = { ...updatedSelections }
                newCheckboxToggleState = { ...updatedCheckboxToggleState }
            }

            // Update the toggle state for PriceTally
            setCheckboxToggleState({ ...newCheckboxToggleState })
        }

        // Update the values in Formik
        setValues({ ...newSelections })

        const { newAvailableOptions, variant } = getMutations({
            hasVariantInventory: product.inventory.hasVariantInventory,
            options: updatedAvailableOptions,
            selectedValues: newSelections,
            variants: product.variants,
        })

        const updatedPrice = calculatePrice({
            prices: variant?.prices || product?.prices,
            productOptions: product.productOptions,
            selectedValues: newSelections,
        })

        // Update product main image, variant availability, and price
        setAvailableOptions(newAvailableOptions)
        setPrices(updatedPrice)
        if (
            variant?.defaultImage &&
            variant.defaultImage.urlOriginal !== defaultImage.urlOriginal
        ) {
            // The image should change only if we have a variant with a defaultImage.
            // E.g., we don't need to update the image if we select an option that
            // has no associated image.
            setImageIsLoading(true)
            setDefaultImage(variant?.defaultImage)
        }
    }

    return (
        <HandleChangeContextProvider handleChange={handleOptionChange}>
            <Factory {...product} />
        </HandleChangeContextProvider>
    )
}

Options.propTypes = {
    checkboxToggles: PropTypes.array,
    checkboxToggleState: PropTypes.object,
    product: PropTypes.object,
    setCheckboxToggleState: PropTypes.func,
}

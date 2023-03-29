import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import useAddItem from '@framework/cart/use-add-item'
import { Formik, Form } from 'formik'
import { initializeValidationSchema } from '@lib/products/initialize-form-values'
import getHYChanges from '@lib/products/get-hiro-changes'
import { getSelectedValues } from '@lib/products/get-mutations'
import getVariant from '@lib/products/get-variant'
import togglePreviewCart from '@lib/toggle-preview-cart'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import OptionsAndButton from './OptionsAndButton'
import styles from './AddToCart.module.scss'

export default function AddToCart({
    checkboxToggles,
    initCheckboxToggleState,
    initialValues,
    product,
}) {
    const addItem = useAddItem()
    const { brand, entityId, productOptions } = product

    const validationSchema = initializeValidationSchema({
        options: productOptions,
        brandName: brand.name,
    })

    const addToCart = async (
        variantId,
        optionSelections,
        { setStatus, setSubmitting }
    ) => {
        try {
            setStatus(null)
            await addItem({
                productId: entityId,
                variantId,
                optionSelections,
            })

            setSubmitting(false)
            togglePreviewCart()
        } catch (error) {
            setStatus(
                error?.response?.data?.detail || error?.response?.data?.title
            )
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    const handleSubmit = async (values, actions) => {
        const optionSelections = {}
        const changes = getHYChanges(values, product)

        // Loop through the values and create the optionSelections
        Object.entries(values).forEach(([key, value]) => {
            let newValue = value

            // If for some reason we need to exclude the current value.
            // E.g., say you have a Hiro slipper that you selected monogram
            // letters for, but then you switched back to tassel, those letters
            // are still in the formData, so we need to dump them.
            if (
                changes !== null &&
                changes.shouldExclude &&
                changes.exclusions.includes(key)
            ) {
                newValue = ''
            }

            optionSelections[key] = newValue
        })

        // untrackedSelectedValues are things like text inputs and checkboxes that
        // don't control inventory but let the user customize their product. We have
        // to submit those in a separate array when adding the product to the cart.
        const { untrackedSelectedValues } = getSelectedValues(
            optionSelections,
            productOptions
        )

        const { entityId } = getVariant(product.variants, optionSelections)
        await addToCart(entityId, untrackedSelectedValues, actions)
    }

    return (
        <section className={styles.container}>
            <ErrorBoundary>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ status }) => (
                        <Form id='addToCart' name='addToCart'>
                            <OptionsAndButton
                                checkboxToggles={checkboxToggles}
                                initCheckboxToggleState={
                                    initCheckboxToggleState
                                }
                                product={product}
                            />
                            {status && (
                                <ErrorMessage
                                    className={styles.error}
                                    message={status}
                                />
                            )}
                        </Form>
                    )}
                </Formik>
            </ErrorBoundary>
        </section>
    )
}

AddToCart.propTypes = {
    checkboxToggles: PropTypes.array,
    initCheckboxToggleState: PropTypes.object,
    initialValues: PropTypes.object,
    product: PropTypes.object,
}

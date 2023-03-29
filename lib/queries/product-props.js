import * as Sentry from '@sentry/nextjs'
import { getConfig } from '@framework/api'
import getProduct from '@framework/api/operations/get-product'

import { queryAPI } from '@lib/api/bc-rest'
import calculatePrice from '@lib/products/calculate-price'
import { initializeValues } from '@lib/products/initialize-form-values'
import {
    getCheckboxToggles,
    getHasSpecificOption,
    getInitCheckboxToggleState,
    getInitCorthay,
    updateToePlates,
} from '@lib/products/options'
import restructureProductData from '@lib/products/restructure-data'
import { queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from './layout-props'
import { PRODUCT_PAGE_QUERY } from './product-info'

const getArchiveGallery = async product => {
    if (!product.isArchiveColl) {
        return null
    }

    try {
        const queryBrand = product.brand.name
            .toLowerCase()
            .replace(/’|'| &/g, '') // Sanitize smart and dumb apostrophes
            .replace(/ — | – | - | |\./g, '-') // Sanitize em dash, en dash, hyphen, and space
        const queryProduct = product.name
            .toLowerCase()
            .replace('.', '')
            .replace(' ', '-')

        const { data } = await queryByUID(
            `mto-${queryBrand}-${queryProduct}`,
            'mto_product'
        )

        return data?.body || null
    } catch (error) {
        Sentry.captureException(error)

        if (error?.message === 'No documents were returned') {
            return null
        }

        throw error
    }
}

const getSizeChart = async fields => {
    const sizeChartUID = fields?.size_chart?.value || null

    const { data } = await queryByUID(sizeChartUID, 'size_chart')

    return data
}

const getProductProps = async (basePath, params, locale, preview) => {
    try {
        // Get site header/footer from Prismic
        const [header, footer, siteBanner] = await getPageLayoutData()

        // Get product info from BigCommerce
        const config = getConfig({ locale })
        const path = `${basePath}/${params.slug}`

        const { product } = await getProduct({
            query: PRODUCT_PAGE_QUERY,
            variables: { path },
            config,
            preview,
        })

        if (!product) {
            throw new Error(`Product with slug '${params.slug}' not found`)
        }

        // We have to query product visibility and the modifiers separately because
        // the GraphQL API doesn't give us the information we need for checkbox
        // modifiers. I.e., BigCommerce requires specific values when adding checkbox
        // modifiers to the cart, and the GraphQL API doesn't include those. So we
        //  query just that data from the REST API and merge it into the product.
        const expandedData = await queryAPI({
            path: `v3/catalog/products/${product.entityId}?include=modifiers&include_fields=modifiers,is_visible`,
        })
        const modifiers = expandedData?.data?.modifiers

        if (!expandedData?.data?.is_visible) {
            throw new Error(
                `Product with slug '${params.slug}' not visible on frontend`
            )
        }

        // Format the BigCommerce product data to our liking
        const restructuredProduct = restructureProductData(product, modifiers)

        // Get the initial values for the Formik AddToCart form
        let initialValues = initializeValues({
            options: restructuredProduct.productOptions,
            isPreowned: restructuredProduct.isPreowned,
        })

        // Necessary for archive products
        const checkboxToggles = getCheckboxToggles(
            restructuredProduct.productOptions
        )
        let initCheckboxToggleState = null

        const hasToePlatesOption = getHasSpecificOption(
            'Toe Plates',
            restructuredProduct.productOptions,
            true
        )

        if (restructuredProduct.isArchiveColl) {
            initCheckboxToggleState =
                getInitCheckboxToggleState(checkboxToggles)

            if (hasToePlatesOption) {
                // Some MTO products have rubber sole options that aren't compatible with metal
                // toe plates. So we check to see if we need to disable toe plates based on the
                // default sole selection.
                const { updatedProductOptions, updatedSelections } =
                    updateToePlates({
                        productOptions: restructuredProduct.productOptions,
                        selections: initialValues,
                    })
                restructuredProduct.productOptions = updatedProductOptions
                initialValues = { ...initialValues, ...updatedSelections }
            }

            if (restructuredProduct.brand.name === 'Corthay') {
                const {
                    shouldUpdateProduct,
                    updatedCheckboxToggleState,
                    updatedSelections,
                    updatedProductOptions,
                } = getInitCorthay(
                    checkboxToggles,
                    initCheckboxToggleState,
                    initialValues,
                    restructuredProduct.archiveData,
                    restructuredProduct.productOptions
                )

                initialValues = { ...initialValues, ...updatedSelections }
                initCheckboxToggleState = {
                    ...initCheckboxToggleState,
                    ...updatedCheckboxToggleState,
                }

                const updatedPrice = calculatePrice({
                    prices: restructuredProduct.prices,
                    productOptions: restructuredProduct.productOptions,
                    selectedValues: initialValues,
                })

                restructuredProduct.prices = updatedPrice

                if (shouldUpdateProduct) {
                    restructuredProduct.productOptions = [
                        ...updatedProductOptions,
                    ]
                }
            }
        }

        // Get size chart and archive gallery from Prismic, if applicable
        const sizeChart = await getSizeChart(restructuredProduct.fields)
        const archiveGallery = await getArchiveGallery(restructuredProduct)

        return {
            props: {
                archiveGallery,
                checkboxToggles,
                footer,
                header,
                initCheckboxToggleState,
                initialValues,
                product: restructuredProduct,
                siteBanner,
                sizeChart,
            },
            revalidate: 1,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

export default getProductProps

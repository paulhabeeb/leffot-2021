export const imageFields = /* GraphQL */ `
    fragment imageFields on Image {
        altText
        urlOriginal
    }
`

const moneyField = /* GraphQL */ `
    fragment moneyField on Money {
        value
        currencyCode
    }
`

export const productPrices = /* GraphQL */ `
    fragment productPrices on Prices {
        price {
            ...moneyField
        }
        salePrice {
            ...moneyField
        }
        retailPrice {
            ...moneyField
        }
        basePrice {
            ...moneyField
        }
    }

    ${moneyField}
`

const textFieldFragment = `
    fragment textFieldOption on TextFieldOption {
        defaultValue
        maxLength
        minLength
    }
`

const checkboxOptionFragment = `
    fragment checkboxOption on CheckboxOption {
        checkedByDefault
        label
    }
`

export const swatchOptionFragment = /* GraphQL */ `
    fragment swatchOption on SwatchOptionValue {
        imageUrl(width: 150)
        isDefault
        hexColors
    }
`

export const multipleChoiceOptionFragment = /* GraphQL */ `
    fragment multipleChoiceOption on MultipleChoiceOption {
        displayStyle
        values {
            edges {
                node {
                    entityId
                    label
                    isDefault
                    ...swatchOption
                }
            }
        }
    }

    ${swatchOptionFragment}
`

const productOptionsFragment = `
    fragment productOptionsFragment on ProductOptionConnection {
        edges {
            node {
                __typename
                entityId
                displayName
                isRequired
                isVariantOption
                ...checkboxOption
                ...multipleChoiceOption
                ...textFieldOption
            }
        }
    }
    
    ${multipleChoiceOptionFragment}
    ${checkboxOptionFragment}
    ${textFieldFragment}
`

export const productExpandedFragment = /* GraphQL */ `
    fragment productExpanded on Product {
        categories {
            edges {
                node {
                    name
                    path
                    breadcrumbs(depth: 3) {
                        edges {
                            node {
                                name
                            }
                        }
                    }
                }
            }
        }
        customFields {
            edges {
                node {
                    name
                    value
                }
            }
        }
        defaultImage {
            ...imageFields
        }
        images {
            edges {
                node {
                    isDefault
                    ...imageFields
                }
            }
        }
    }

    ${imageFields}
`

export const productBaseFragment = /* GraphQL */ `
    fragment productBase on Product {
        entityId
        name
        path
        brand {
            name
            path
        }
        description
        prices {
            ...productPrices
        }
        inventory {
            hasVariantInventory
            isInStock
        }
        availabilityV2 {
            ... on ProductAvailable {
                status
                description
            }
            ... on ProductUnavailable {
                message
                status
                description
            }
            ... on ProductPreOrder {
                message
                status
                description
            }
        }
    }

    ${productPrices}
`

export const productCardFragment = /* GraphQL */ `
    fragment productCard on Product {
        ...productBase
        ...productExpanded
    }

    ${productBaseFragment}
    ${productExpandedFragment}
`

export const productConnectionFragment = /* GraphQL */ `
    fragment productConnnection on ProductConnection {
        pageInfo {
            startCursor
            endCursor
        }
        edges {
            cursor
            node {
                ...productBase
                ...productExpanded
            }
        }
    }

    ${productBaseFragment}
    ${productExpandedFragment}
`

export const PRODUCT_SEARCH_QUERY = `
    query paginateProducts($query: String!, $cursor: String) {
        site {
            search {
                searchProducts(
                    filters: { searchTerm: $query, hideOutOfStock: true }
                    sort: RELEVANCE
                ) {
                    products(first: 45, after: $cursor) {
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                            endCursor
                            startCursor
                        }
                        edges {
                            node {
                                ...productBase
                                ...productExpanded
                                productOptions {
                                    ...productOptionsFragment
                                }
                                variants(first: 250) {
                                    edges {
                                        node {
                                            entityId
                                            defaultImage {
                                                urlOriginal
                                                altText
                                                isDefault
                                            }
                                            prices {
                                                ...productPrices
                                            }
                                            inventory {
                                                aggregated {
                                                    availableToSell
                                                    warningLevel
                                                }
                                                isInStock
                                            }
                                            productOptions {
                                                ...productOptionsFragment
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    ${productBaseFragment}
    ${productExpandedFragment}
    ${productOptionsFragment}
`

export const CART_PRODUCT_QUERY = /* GraphQL */ `
    query getCartProducts($productIds: [Int!]) {
        site {
            products(entityIds: $productIds) {
                edges {
                    node {
                        ...productBase
                        ...productExpanded
                        productOptions {
                            ...productOptionsFragment
                        }
                        variants(first: 250) {
                            edges {
                                node {
                                    entityId
                                    defaultImage {
                                        urlOriginal
                                        altText
                                        isDefault
                                    }
                                    prices {
                                        ...productPrices
                                    }
                                    inventory {
                                        aggregated {
                                            availableToSell
                                            warningLevel
                                        }
                                        isInStock
                                    }
                                    productOptions {
                                        ...productOptionsFragment
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    ${productBaseFragment}
    ${productExpandedFragment}
    ${productOptionsFragment}
`

export const PRODUCT_PAGE_QUERY = /* GraphQL */ `
    query getProduct($path: String!) {
        site {
            route(path: $path) {
                node {
                    __typename
                    ... on Product {
                        ...productBase
                        ...productExpanded
                        productOptions {
                            ...productOptionsFragment
                        }
                        variants(first: 250) {
                            edges {
                                node {
                                    entityId
                                    defaultImage {
                                        urlOriginal
                                        altText
                                        isDefault
                                    }
                                    prices {
                                        ...productPrices
                                    }
                                    inventory {
                                        aggregated {
                                            availableToSell
                                            warningLevel
                                        }
                                        isInStock
                                    }
                                    productOptions {
                                        ...productOptionsFragment
                                    }
                                }
                            }
                        }
                        relatedProducts(hideOutOfStock: true) {
                            edges {
                                node {
                                    ...productBase
                                    ...productExpanded
                                }
                            }
                        }
                        seo {
                            pageTitle
                            metaKeywords
                            metaDescription
                        }
                    }
                }
            }
        }
    }

    ${productBaseFragment}
    ${productExpandedFragment}
    ${productOptionsFragment}
`

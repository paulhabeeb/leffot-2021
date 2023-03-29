import * as Sentry from '@sentry/nextjs'
import { getConfig } from '@framework/api'
import { predicate } from '@prismicio/client'
import { queryAllOfType, queryBanner, queryByUID } from './prismic'
import getPageLayoutData from './layout-props'
import { productCardFragment } from './product-info'

import getGallery from '@lib/brand/get-gallery'
import { giftCard, urls } from '@lib/data'
import todaysDate from '@lib/now'
import restructureProductData from '@lib/products/restructure-data'

const getCategoryProductsQuery = (path, sortBy = 'FEATURED', after = '') => {
    return `
        query getCategoryProducts {
            site {
                route(path: "${path}") {
                    node {
                        __typename
                        ... on Category {
                            name
                            products(first: 45, hideOutOfStock: true, sortBy: ${sortBy}, after: "${after}") {
                                pageInfo {
                                    hasNextPage
                                    startCursor
                                    endCursor
                                    hasPreviousPage
                                }
                                edges {
                                    node {
                                        ...productCard
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    
        ${productCardFragment}
    `
}

const getProducts = async (path, sort, locale, after = '') => {
    const config = getConfig({ locale })
    const PRODUCTS_QUERY = getCategoryProductsQuery(path, sort, after)

    const res = await config.fetch(PRODUCTS_QUERY)
    const { node } = res.data.site.route

    if (node === null) {
        return null
    }

    const { edges, pageInfo } = node.products
    let productsArray = edges || null

    if (pageInfo.hasNextPage) {
        const moreProducts = await getProducts(
            path,
            sort,
            locale,
            pageInfo.endCursor
        )
        productsArray = [...productsArray, ...moreProducts]
    }

    return productsArray
}

const getCategoryData = async ({
    basePath = '/',
    locale,
    queryType = 'category',
    slug,
}) => {
    try {
        const categorySlug = slug.includes('pre-owned') ? 'pre-owned' : slug

        const [[header, footer, siteBanner], category, banner] =
            await Promise.all([
                getPageLayoutData(),
                queryByUID(categorySlug, queryType), // Get category header from Prismic
                queryBanner('category_banner'),
            ])

        // Get category products from BigCommerce
        const rawProducts = await getProducts(
            `${basePath}${slug}`,
            category.data.default_product_sort,
            locale
        )

        // For custom made brands, we need some data that's also in the regular brand page
        let brand = null
        let events = []
        let gallery = null
        if (queryType === 'custom_made_brand') {
            const now = todaysDate()
            const [brandData, eventsData] = await Promise.all([
                queryByUID(slug, 'brand'),
                queryAllOfType('event', {
                    orderings: {
                        field: 'my.event.date',
                        direction: 'asc',
                    },
                    predicates: [
                        predicate.dateAfter('my.event.expiry', now),
                        predicate.at('document.tags', [slug]),
                    ],
                }),
            ])

            brand = brandData
            events = eventsData
            gallery = await getGallery(brand?.data?.gallery)
        }

        // If we're in a /categories/ url, see if the current category has any subcategories.
        // And if we're in a /pre-owned/brand/[brandName] url, we have to get the name of the brand
        // from the menu because we don't store that info anywhere else. Otherwise we'd have to create
        // individual categories pages in Prismic for every single POW brand, which would be a bit much.
        let subcategories = []
        let powBrandName = null
        if (queryType === 'category') {
            header.data.body.forEach(menuItem => {
                const {
                    primary: { link_label, dropdown_menu },
                } = menuItem

                if (link_label === 'Categories') {
                    dropdown_menu.data.body.forEach(subMenuItem => {
                        const {
                            primary: { link },
                            items,
                        } = subMenuItem

                        if (
                            link.uid === slug &&
                            items[0].subcategory_label !== null
                        ) {
                            subcategories = subMenuItem.items
                        }
                    })
                }

                if (link_label === 'Pre-owned') {
                    dropdown_menu.data.body.forEach(subMenuItem => {
                        const {
                            primary: { group_label },
                            items,
                        } = subMenuItem

                        if (group_label === 'Brands') {
                            items.forEach(powItem => {
                                let linkSlug = powItem.link.url.replace(
                                    `${urls.baseUrl}/`,
                                    ''
                                )
                                linkSlug = linkSlug.endsWith('/')
                                    ? linkSlug.slice(0, -1)
                                    : linkSlug

                                if (linkSlug === slug) {
                                    powBrandName = powItem.link_label
                                }
                            })
                        }
                    })
                }
            })
        }

        // Restructure the product data for better use in React
        const categoryProducts =
            rawProducts !== null
                ? rawProducts.map(product =>
                      restructureProductData(product.node)
                  )
                : []

        // If the category has callouts in the product grid, (e.g., Pre-owned Get Notified),
        // then query the data for those callouts.
        if (
            category.data?.linked_callout?.length > 0 &&
            categoryProducts !== null
        ) {
            for (let i = 0; i < category.data.linked_callout.length; i++) {
                const {
                    callout: { type, uid },
                    position,
                    show_callout,
                } = category.data.linked_callout[i]

                if (show_callout && categoryProducts.length >= position) {
                    if (uid === 'gift-card-product') {
                        categoryProducts.splice(position, 0, giftCard.product)
                        continue
                    }

                    let calloutData = await queryByUID(uid, type)

                    // Sometimes when there's no background image, Prismic will return an array
                    // with one value inside, except the value will have no data. That throws
                    // everything else off, so we should check to see if that's what's happening
                    // and instead set the image to null, if so.
                    if (
                        calloutData.data.background_images.length === 1 &&
                        Object.keys(
                            calloutData.data.background_images[0]
                                .background_image
                        ).length === 0
                    ) {
                        calloutData.data.background_images = null
                    }

                    categoryProducts.splice(position, 0, {
                        cardType: 'linked-callout',
                        ...calloutData.data,
                        position,
                    })
                }
            }
        }

        const categoryHeader = powBrandName
            ? {
                  ...category.data,
                  meta_title: `${powBrandName} - ${category.data.meta_title}`,
                  canonical_url: `${urls.baseUrl}/${slug}`,
              }
            : category.data

        return {
            props: {
                banner,
                categoryBrand: brand?.data || null,
                categoryBrandEvents: events,
                categoryHeader,
                categoryProducts,
                categoryType: queryType,
                footer,
                gallery,
                header,
                powBrandName,
                siteBanner,
                subcategories,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)
        return { notFound: true }
    }
}

export default getCategoryData

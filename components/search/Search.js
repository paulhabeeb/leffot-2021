import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import axios from 'axios'
import restructureProductData from '@lib/products/restructure-data'
import { PRODUCT_SEARCH_QUERY } from '@lib/queries/product-info'

import { ProductsWithSidebar } from '@components/category'
import { ErrorBoundary, ErrorMessage } from '@components/common'
import { Base, SidebarAndGridWrapper } from '@components/layout'
import { CategoryProductGrid, PageLoader } from '@components/placeholders'
import { SearchForm } from './SearchForm'
import styles from './Search.module.scss'

export default function Search({ footer, header, page, siteBanner }) {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [resultsCount, setResultsCount] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()
    const { q } = router.query
    const query = q || ''

    const { canonical_url, meta_description, meta_title, product_filters } =
        page

    let pageTitle = meta_title
    let resultsTitle = 'Search'

    if (loading) {
        pageTitle = `Searching for “${query}”`
        resultsTitle = `Searching for “${query}”`
    }

    if (products) {
        pageTitle = `Results for “${query}”`
        resultsTitle = `${resultsCount} results for “${query}”`
    }

    useEffect(() => {
        const formatResults = rawResults => {
            const formattedProducts = rawResults.edges.map(product =>
                restructureProductData(product.node)
            )
            const hasNextPage = rawResults.pageInfo.hasNextPage
            const endCursor = rawResults.pageInfo.endCursor
            const count = hasNextPage ? '45+' : rawResults.edges.length

            return { count, endCursor, formattedProducts, hasNextPage }
        }

        const sendSearchQuery = async ({
            endCursor,
            initProducts,
            queryString,
        }) => {
            const response = await axios('/api/bc-graphql', {
                method: 'POST',
                data: {
                    query: PRODUCT_SEARCH_QUERY,
                    variables: { cursor: endCursor, query: queryString },
                },
            })

            const formattedResponse = formatResults(
                response?.data?.data?.site?.search?.searchProducts?.products
            )

            // If there's a next page, fetch it and add that data to the existing data.
            if (endCursor) {
                const extendedProducts = [
                    ...initProducts,
                    ...formattedResponse.formattedProducts,
                ]
                setProducts(extendedProducts)

                if (formattedResponse.hasNextPage) {
                    await sendSearchQuery({
                        endCursor: formattedResponse.endCursor,
                        initProducts: extendedProducts,
                        queryString,
                    })
                }
            } else {
                return formattedResponse
            }
        }

        const search = async () => {
            if (query !== '') {
                try {
                    setLoading(true)
                    setProducts(null)

                    const { count, endCursor, formattedProducts, hasNextPage } =
                        await sendSearchQuery({
                            queryString: query,
                        })

                    setResultsCount(count)
                    setProducts(formattedProducts)
                    setLoading(false)

                    // The graphql API doesn't tell us how many pages there are or the total results.
                    // On top of that, every other page that uses the <ProductsWithSidebar /> component
                    // feeds a full set of products into that component, dividing them into pages artificially.
                    // I.e., if there are 107 products in a category, we always provide <ProductsWithSidebar />
                    // with all 107, rather than giving it one page worth and fetching the rest as the user
                    // requests them. The reason this matters is that the graphql API doesn't let us fetch
                    // all the results at once. It will give us a max of 50 per query. So instead of writing
                    // a new paginator with different logic that fetches additional pages as the user requests
                    // them, we fetch them silently in the background, after fetching the initial results.
                    if (hasNextPage) {
                        await sendSearchQuery({
                            endCursor,
                            initProducts: formattedProducts,
                            queryString: query,
                        })
                    }
                } catch (error) {
                    setLoading(false)
                    setError(
                        'There was an error with your search. Please try again later.'
                    )
                    Sentry.captureException(error)
                }
            }
        }

        search()
    }, [query])

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <div id='main'>
                <NextSeo
                    canonical={canonical_url}
                    description={meta_description}
                    title={pageTitle}
                    openGraph={{
                        title: pageTitle,
                        url: canonical_url,
                    }}
                />
                <section className={styles.container}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>{resultsTitle}</h1>
                        <SearchForm prefill={query} key={query} />
                    </div>
                </section>
                {error && <ErrorMessage message={error} />}
                {loading ? (
                    <>
                        <PageLoader />
                        <CategoryProductGrid />
                    </>
                ) : (
                    <ErrorBoundary>
                        {products ? (
                            <SidebarAndGridWrapper>
                                <ProductsWithSidebar
                                    context='query'
                                    initFilters={product_filters}
                                    initProducts={products}
                                    productsPerPage={15}
                                    key={query}
                                />
                            </SidebarAndGridWrapper>
                        ) : null}
                    </ErrorBoundary>
                )}
            </div>
        </Base>
    )
}

Search.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

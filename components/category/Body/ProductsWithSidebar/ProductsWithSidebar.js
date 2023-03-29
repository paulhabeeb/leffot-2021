import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { getFilters } from '@lib/category/filters'

import Filters from '../Filters'
import ProductGrid from './ProductGrid'
import ProductPaginator from './ProductPaginator'
import styles from './ProductsWithSidebar.module.scss'

export default function ProductsWithSidebar({
    context,
    initFilters,
    initProducts,
    productsPerPage,
}) {
    const router = useRouter()
    const { asPath, pathname, query } = router
    const PRODUCTS_PER_PAGE = productsPerPage || 15
    const [products, setProducts] = useState(initProducts)

    const [filters, setFilters] = useState(initFilters)
    const [selectedFilters, setSelectedFilters] = useState([])

    // Prismic automatically includes a blank filter when making a new page, so we
    // have to make sure that filter has been filled out. We also check to see if
    // any of the products in the category match any of the available filters. E.g.,
    // say there's one filter in the category, Color. We loop every product and see
    // if any have a custom field called Color. If not, we don't display the filters
    // sidebar.
    const hasFilters =
        initFilters.length > 0 &&
        initFilters[0].title !== null &&
        filters.some(filter =>
            products.some(product => product.fields?.[filter.slug])
        )
    const filtersArentEmpty = filters.length > 0 && filters[0].title !== null
    const hasActiveFilter = Object.keys(query).some(q => /f\./.test(q))

    const [isOneCol, setIsOneCol] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

    // On category change, update the products and current page for Nextjs
    useEffect(() => {
        const page = query?.page ? parseInt(query.page) : 1

        setCurrentPage(page)
    }, [asPath]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setProducts(initProducts)
    }, [initProducts]) // eslint-disable-line react-hooks/exhaustive-deps

    // Update our filters and visible products when a filter is selected
    useEffect(() => {
        const filtersToUse =
            filtersArentEmpty && hasActiveFilter ? filters : initFilters

        if (hasFilters) {
            const { newFilters, newSelectedFilters, filteredProducts } =
                getFilters(filtersToUse, initProducts, query)

            setFilters(newFilters)
            setSelectedFilters(newSelectedFilters)
            setProducts(filteredProducts)
        }
    }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

    // Show only one page of products by default
    let productsToDisplay = products.slice(
        PRODUCTS_PER_PAGE * currentPage - PRODUCTS_PER_PAGE,
        PRODUCTS_PER_PAGE * currentPage
    )
    // If currentPage is 0, then that means the user clicked
    // "View All Products", so we should show them everything
    if (currentPage === 0) {
        productsToDisplay = [...products]
    }

    const isPreownedCategory =
        pathname === '/pre-owned' || pathname === '/pre-owned/brands/[slug]'

    const className = cn(styles.products, {
        [styles.oneUp]: isOneCol,
    })

    return (
        <>
            {hasFilters && (
                <Filters
                    filters={filters}
                    isOneCol={isOneCol}
                    selectedFilters={selectedFilters}
                    setIsOneCol={setIsOneCol}
                />
            )}
            <main className={className}>
                <ProductGrid
                    context={context}
                    isOneCol={isOneCol}
                    isPreownedCategory={isPreownedCategory}
                    products={productsToDisplay}
                />
                <ProductPaginator
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </main>
        </>
    )
}

ProductsWithSidebar.propTypes = {
    context: PropTypes.string,
    initFilters: PropTypes.array,
    initProducts: PropTypes.array,
    productsPerPage: PropTypes.number,
}

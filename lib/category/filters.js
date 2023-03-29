export const checkIfFilterHasMultipleSelections = (filterTitle, query) => {
    const selectedFilterKeys = Object.keys(query).filter(e => {
        const key = e.replace('f.', '').replace(/\[[0-9][0-9]{0,2}\]/, '')

        return key === filterTitle
    })
    const hasMultipleSelections = selectedFilterKeys.length > 1

    return { hasMultipleSelections, selectedFilterKeys }
}

const getFilterValueFromProduct = (product, filterTitle) => {
    let filterValue = null
    if (filterTitle === 'brand') {
        filterValue = product.brand.name
    }
    if (filterTitle === 'pre_order') {
        filterValue = product.isPreorder ? 'Pre-order' : 'In stock'
    }
    if (product.fields?.[filterTitle]) {
        filterValue = product.fields[filterTitle].value
    }

    return filterValue
}

const getNewSelectedFilters = query => {
    const newSelectedFilters = []

    Object.keys(query).forEach(key => {
        if (/f\./.test(key)) {
            const newKey = key
                .replace('f.', '')
                .replace(/\[[0-9][0-9]{0,2}\]/, '')

            const { hasMultipleSelections } =
                checkIfFilterHasMultipleSelections(newKey, query)

            newSelectedFilters.push({
                hasMultipleSelections,
                slug: newKey,
                value: query[key],
            })
        }
    })

    return newSelectedFilters
}

const getFilteredProducts = (initProducts, newSelectedFilters) => {
    return initProducts.filter(product => {
        // Callouts in categories like Pre-owned (Get Notified) are added
        // to the products array, so ignore anything that isn't a product.
        if (newSelectedFilters.length > 0 && product.cardType !== 'product') {
            return false
        }

        // If the product matches at least one selection from every filter
        return newSelectedFilters.every(filter => {
            const productValue = getFilterValueFromProduct(product, filter.slug)

            // If the filter has multiple selections, e.g., for color the user
            // wants to see black shoes and brown shoes, then make sure the product
            // matches at least one of those, not just the filter we're looking at now.
            const matchesAnother =
                filter.hasMultipleSelections &&
                newSelectedFilters.some(secondFilter => {
                    return (
                        secondFilter.slug === filter.slug &&
                        secondFilter.value === productValue
                    )
                })

            return filter.value === productValue || matchesAnother
        })
    })
}

const getNewFilters = (filters, initProducts, newSelectedFilters) => {
    // Derive the available values for each filter from the products
    // in the current category
    return filters.map(filter => {
        const items = []

        // Loop through all products in the category to generate the
        // available filter options
        initProducts.forEach(product => {
            // Callouts in categories like Pre-owned (Get Notified) are added
            // to the products array, so ignore anything that isn't a product.
            if (product.cardType !== 'product') {
                return false
            }

            const filterTitle = filter.slug.toLowerCase()
            const filterValue = getFilterValueFromProduct(product, filterTitle)

            let shouldShow = true
            let matchesOneFromEachFilter = true

            if (newSelectedFilters.length > 0) {
                // Loop through all the selected filters, and ignore the filter
                // we're trying to build right now. Check all the other selected
                // filters against the product we're looking at. If they match, add
                // that product's attributes to the filters. If not, exclude them.
                //
                // E.g., if the filters "Alden" and "Boots" are selected, and we're
                // looking at an Edward Green Galway. When we cycle through Brands,
                // we want to know if we should include EG in the list. Since "Boots"
                // is selected, and the Galway is a boot, EG should be represented
                // in the Brands section. But a Corthay Arca would not.
                shouldShow = newSelectedFilters.every(selectedFilter => {
                    // Ignore the filter we're currently trying to generate.
                    // E.g., If we're cycling through Brands, ignore brands in the
                    // selected filters list.
                    if (selectedFilter.slug === filterTitle) {
                        return true
                    }

                    const testValue = getFilterValueFromProduct(
                        product,
                        selectedFilter.slug
                    )

                    const matchesAnother =
                        selectedFilter.hasMultipleSelections &&
                        newSelectedFilters.some(
                            e =>
                                e.slug === selectedFilter.slug &&
                                e.value === testValue
                        )

                    const isActiveFilter = newSelectedFilters.some(
                        e => e.slug === filterTitle && e.value === filterValue
                    )

                    const valuesMatch = selectedFilter.value === testValue

                    // If the product we're looking at doesn't match the selected filter,
                    // then we don't want to include its attributes when populating all
                    // the other filters
                    return valuesMatch || matchesAnother || isActiveFilter
                })

                // Loop through the selected filters to determine if the current product
                // should be included in all the other filters' product counts. E.g., if
                // Alden is selected and we're looking at an Edward Green, and we're trying
                // to generate product counts for colors, the EG should not help populate those.
                for (let i = 0; i < newSelectedFilters.length; i++) {
                    const selectedFilter = newSelectedFilters[i]

                    if (selectedFilter.slug === filterTitle) {
                        continue
                    }

                    const testValue = getFilterValueFromProduct(
                        product,
                        selectedFilter.slug
                    )

                    // If the product's value doesn't match the selected filter, and there
                    // isn't another selection from the same filter, don't include the product
                    // in the count. E.g., if Alden is selected from Brands and we're looking
                    // at a pair of Edward Greens, we don't want the EG to influence the count.
                    if (
                        testValue !== selectedFilter.value &&
                        !selectedFilter.hasMultipleSelections
                    ) {
                        matchesOneFromEachFilter = false
                        break
                    }

                    // If there are multiple selections from a single filter, see if the product
                    // matches any of the others.
                    if (selectedFilter.hasMultipleSelections) {
                        matchesOneFromEachFilter = newSelectedFilters.some(
                            otherSelection =>
                                otherSelection.slug === selectedFilter.slug &&
                                otherSelection.value === testValue
                        )
                    }

                    if (!matchesOneFromEachFilter) {
                        break
                    }
                }
            }

            // If the product doesn't have this custom field, we don't
            // want to include it in the data for this filter
            if (!shouldShow || filterValue == null) {
                return
            }

            // See if this filter value has already been added to the array
            const index = items.findIndex(e => e.title === filterValue)
            const hasBeenAdded = index > -1
            const selected = newSelectedFilters.some(e => {
                return e.slug === filterTitle && e.value === filterValue
            })

            // If it has, increment the product count, otherwise add a new item
            if (hasBeenAdded) {
                const count =
                    !selected || (selected && matchesOneFromEachFilter)
                        ? items[index].count + 1
                        : items[index].count

                items[index] = {
                    ...items[index],
                    count,
                }
            } else {
                const count =
                    !selected || (selected && matchesOneFromEachFilter) ? 1 : 0

                items.push({
                    count,
                    selected,
                    title: filterValue,
                })
            }
        })

        // Sort all the filter items alphabetically
        items.sort((a, b) => {
            // If the filter items are number, like size, we want to parse them as
            // numbers, otherwise they'll be sorted incorrectly, with things like 10.5
            // coming before 6.
            const isNumber =
                filter.slug === 'pow_size_uk' || filter.slug === 'pow_size_us'
            const aTitle = isNumber
                ? parseFloat(a.title)
                : a.title.toLowerCase()
            const bTitle = isNumber
                ? parseFloat(b.title)
                : b.title.toLowerCase()

            if (aTitle < bTitle) {
                return -1
            }

            if (aTitle > bTitle) {
                return 1
            }

            return 0
        })

        return {
            ...filter,
            items,
            total_items: items.length,
        }
    })
}

export const getFilters = (filters, initProducts, query) => {
    const newSelectedFilters = getNewSelectedFilters(query)
    const filteredProducts = getFilteredProducts(
        initProducts,
        newSelectedFilters
    )
    const newFilters = getNewFilters(filters, initProducts, newSelectedFilters)

    return {
        filteredProducts,
        newFilters,
        newSelectedFilters,
    }
}

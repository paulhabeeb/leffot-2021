import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { checkIfFilterHasMultipleSelections } from '@lib/category/filters'

import {
    Filters,
    MobileFilters,
    SelectedFilters,
} from '@components/common/Filters'
import FilterBlockFactory from './FilterBlockFactory'
import SidebarButtons from './SidebarButtons'

export default function ProductFilters({
    filters,
    isOneCol,
    selectedFilters,
    setIsOneCol,
}) {
    const router = useRouter()
    const [filtersAreOpen, setFiltersAreOpen] = useState(false)

    const toggleFilters = () => setFiltersAreOpen(!filtersAreOpen)

    const filterProducts = (filter, item, selected, clearAll = false) => {
        const el = document.getElementById('mobile_filters_modal_top')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

        const query = { ...router.query, page: 1 }

        // The query object contains other things like page number and the UID
        // of the page. We remove those so we're left with an array of only
        // the product filters.
        const { hasMultipleSelections, selectedFilterKeys } =
            checkIfFilterHasMultipleSelections(filter, query)

        // We want to find the name of the filter, e.g., f.brand or f.color.
        // When multiple items from the same filter are selected, it becomes
        // f.brand[0], f.brand[1], and so on. We default to f.brand.
        const baseFilter = `f.${filter}`
        let filterType = baseFilter

        // See if any of the active filters already have multiple selections
        // for a single filter. E.g., two brands selected, two colors. Multiple
        // selections are stored as an array: filter.brand
        if (hasMultipleSelections) {
            Object.entries(query).forEach(([key, value]) => {
                // Strip the filter name of everything except its actual name.
                // Goes from f.brand or f.brand[1] to just 'brand'.
                const newKey = key
                    .replace('f.', '')
                    .replace(/\[[0-9][0-9]{0,2}\]/, '')

                // If we're trying to deselect an item, then we want to get the key
                // of the exact item, not just any old key. For all other selections,
                // the final key will be returned.
                if (selected && value !== item) {
                    return
                }

                if (newKey === filter) {
                    filterType = `${key}`
                }
            })
        }

        // See if this is the first item we're selecting from this filter type,
        // or if it's the second, third, or even greater.
        const hasSelected = !!query?.[filterType]

        if (clearAll) {
            Object.keys(query).forEach(key => {
                if (/f\./.test(key)) {
                    delete query[key]
                }
            })
        } else if (selected) {
            delete query[filterType]

            // If we have multiple selections, and we're down to the last two,
            // and we've just removed one, so we have only a single selection remaining,
            // we need to update the filter key for that selection, from f.brand[0] to
            // simply f.brand. Otherwise we won't be able to deselect that one when/if
            // the time comes.
            if (hasMultipleSelections && selectedFilterKeys.length === 2) {
                // We search the selected keys array for the filter that's leftover
                const remainingFilterKey = selectedFilterKeys
                    .filter(key => key !== filterType)
                    .toString()
                const remainingFilter = query[remainingFilterKey]

                delete query[remainingFilterKey]
                query[baseFilter] = remainingFilter
            }
        } else if (hasSelected) {
            // If we're not trying to remove a currently selected filter,
            // i.e., if we're trying to add a filter from the same group

            // If there are already at least two selected options from this
            // filter and we're trying to add another
            if (hasMultipleSelections) {
                const newKey = `${baseFilter}[${selectedFilterKeys.length}]`
                query[newKey] = item
            } else {
                // If there's only one option and we're adding a second
                query[`${filterType}[0]`] = query[filterType]
                query[`${filterType}[1]`] = item

                delete query[filterType]
            }
        } else {
            query[filterType] = item
        }

        router.push({
            pathname: router.pathname,
            query,
        })
    }

    const selectedFiltersComponent = (
        <SelectedFilters filters={selectedFilters} onClick={filterProducts} />
    )
    const filtersComponent = (
        <FilterBlockFactory filters={filters} onClick={filterProducts} />
    )
    const mobileFilters = (
        <MobileFilters isOpen={filtersAreOpen} toggleFilters={toggleFilters}>
            <SelectedFilters
                context='modal'
                filters={selectedFilters}
                onClick={filterProducts}
            />
            {filtersComponent}
        </MobileFilters>
    )
    const sidebarButtons = (
        <SidebarButtons
            toggleFilters={toggleFilters}
            toggleViewStyle={() => setIsOneCol(!isOneCol)}
            isOneCol={isOneCol}
        />
    )

    return (
        <Filters
            filters={filtersComponent}
            mobileFilters={mobileFilters}
            selectedFilters={selectedFiltersComponent}
            sidebarButtons={sidebarButtons}
        />
    )
}

ProductFilters.propTypes = {
    filters: PropTypes.array,
    isOneCol: PropTypes.bool,
    selectedFilters: PropTypes.array,
    setIsOneCol: PropTypes.func,
}

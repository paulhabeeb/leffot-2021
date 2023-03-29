import { useState } from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'

import { FilterItemCheckbox, FilterItemsList } from '@components/common/Filters'

export default function FilterItemFactory({
    defaultVisible,
    filter,
    items,
    onClick,
    showMoreLabel,
    style,
}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const hasMoreResults = defaultVisible && items.length > defaultVisible

    let maxVisible = items.length
    if (!isExpanded && hasMoreResults) {
        maxVisible = defaultVisible
    }

    const filterItems = []
    for (let i = 0; i < maxVisible; i++) {
        const item = items[i]
        const handleClick = () =>
            onClick(filter.slug.toLowerCase(), item.title, item.selected)
        const name =
            style === 'Color Checkbox' ? item.title : `['${item.title}']`
        const id = slugify(`${filter.title}-${item.title}`, {
            lower: true,
            strict: true,
        })

        filterItems.push(
            <FilterItemCheckbox
                count={item.count}
                key={i}
                id={id}
                name={name}
                onClick={handleClick}
                selected={item.selected}
                style={style}
                title={item.title}
            />
        )
    }

    return (
        <FilterItemsList
            hasMoreResults={hasMoreResults}
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            showMoreLabel={showMoreLabel}
        >
            {filterItems}
        </FilterItemsList>
    )
}

FilterItemFactory.propTypes = {
    defaultVisible: PropTypes.number,
    filter: PropTypes.object,
    items: PropTypes.array,
    onClick: PropTypes.func,
    showMoreLabel: PropTypes.string,
    style: PropTypes.string,
}

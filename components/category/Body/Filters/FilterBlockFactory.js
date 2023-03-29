import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { FilterBlock } from '@components/common/Filters'
import FilterItemFactory from './FilterItemFactory'

export default function FilterBlockFactory({ filters, onClick }) {
    const filterBlocks = []
    filters.forEach((filter, index) => {
        const {
            default_visible_items,
            items,
            start_collapsed,
            style,
            title,
            total_items,
        } = filter

        if (total_items > 0) {
            const initialValues = {}
            const validationSchema = {}

            items.forEach(item => {
                initialValues[item.title] = item.selected
                validationSchema[item.title] = Yup.boolean()
            })

            let showMoreLabel = `${title}s`
            if (title === 'Size (US)' || title === 'Size (UK)') {
                showMoreLabel = title
            }

            filterBlocks.push(
                <FilterBlock
                    blockTitle={title}
                    initialValues={initialValues}
                    startCollapsed={start_collapsed}
                    validationSchema={validationSchema}
                    key={index}
                >
                    <FilterItemFactory
                        filter={filter}
                        items={items}
                        defaultVisible={default_visible_items}
                        onClick={onClick}
                        showMoreLabel={showMoreLabel}
                        style={style}
                    />
                </FilterBlock>
            )
        }
    })

    return filterBlocks
}

FilterBlockFactory.propTypes = {
    filters: PropTypes.array,
    onClick: PropTypes.func,
}

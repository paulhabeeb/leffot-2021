import PropTypes from 'prop-types'
import * as Yup from 'yup'

import { FilterBlock } from '@components/common/Filters'
import FilterItemFactory from './FilterItemFactory'

export default function FilterBlockFactory({
    filters,
    handleChange,
    offerings,
    type,
}) {
    return filters.map((filter, index) => {
        const initialValues = {}
        const validationSchema = {}

        initialValues[filter.id] = offerings
        if (filter.id === 'type') {
            initialValues[filter.id] = type
        }
        validationSchema[filter.id] = Yup.string()

        return (
            <FilterBlock
                blockTitle={filter.title}
                initialValues={initialValues}
                key={index}
                showMoreLabel={filter.title}
                validationSchema={validationSchema}
            >
                <FilterItemFactory
                    fieldsetId={filter.id}
                    handleChange={handleChange}
                    items={filter.values}
                />
            </FilterBlock>
        )
    })
}

FilterBlockFactory.propTypes = {
    filters: PropTypes.array,
    handleChange: PropTypes.func,
    offerings: PropTypes.string,
    type: PropTypes.string,
}

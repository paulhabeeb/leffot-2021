import PropTypes from 'prop-types'

import { FilterItemRadio, FilterItemsList } from '@components/common/Filters'

export default function FilterItemFactory({ fieldsetId, handleChange, items }) {
    const radios = []

    items.forEach((item, index) => {
        radios.push(
            <FilterItemRadio
                id={item.id}
                key={index}
                label={item.label}
                name={fieldsetId}
                onClick={() => handleChange(fieldsetId, item.label)}
                selected={item.selected}
                title={item.label}
                value={item.label}
            />
        )
    })

    return <FilterItemsList hasMoreResults={false}>{radios}</FilterItemsList>
}

FilterItemFactory.propTypes = {
    fieldsetId: PropTypes.string,
    handleChange: PropTypes.func,
    items: PropTypes.array,
}

import PropTypes from 'prop-types'
import { Radio } from '@leffot/form-controls'

import FilterItemWrapper from './FilterItemWrapper'

export default function FilterItemRadio({
    id,
    label,
    name,
    onClick,
    title,
    value,
}) {
    return (
        <FilterItemWrapper>
            <Radio
                id={id}
                label={label}
                name={name}
                onClick={onClick}
                value={value}
            >
                <span dangerouslySetInnerHTML={{ __html: title }} />
            </Radio>
        </FilterItemWrapper>
    )
}

FilterItemRadio.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
}

import PropTypes from 'prop-types'
import { FormRow, Select as SelectInput } from '@leffot/form-controls'

import { useHandleChangeContext } from '@components/product'
import formatLabel from '@lib/products/format-label'
import { DROPDOWN_INITIAL_VALUE } from '@lib/products/initialize-form-values'

export default function Select({ conditionals, largeLabel, name, option }) {
    const handleChange = useHandleChangeContext()
    const handleClick = event => handleChange(name, event.target.value)
    const id = option.entityId.toString()

    const formOptions = option.values.map((value, index) => {
        const label = formatLabel(conditionals, option, value)
        const isDisabled = value.disabled

        return (
            <option disabled={isDisabled} value={value.entityId} key={index}>
                {label}
                {isDisabled && ' (unavailable)'}
            </option>
        )
    })

    return (
        <FormRow>
            <SelectInput
                hideLabel={false}
                id={id}
                label={option.displayName}
                largeLabel={largeLabel}
                name={name}
                onChange={handleClick}
                options={formOptions}
                placeholder={DROPDOWN_INITIAL_VALUE}
            />
        </FormRow>
    )
}

Select.propTypes = {
    conditionals: PropTypes.object,
    largeLabel: PropTypes.bool,
    name: PropTypes.string,
    option: PropTypes.object,
}

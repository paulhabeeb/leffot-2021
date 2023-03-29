import PropTypes from 'prop-types'
import { FormRow, TextInput } from '@leffot/form-controls'
import { useHandleChangeContext } from '@components/product'

export default function Text({ label, largeLabel, name }) {
    const handleChange = useHandleChangeContext()
    const handleClick = event => handleChange(name, event.target.value)
    const labelSize = largeLabel ? 'large' : 'regular'

    return (
        <FormRow>
            <TextInput
                id={name}
                label={label}
                name={name}
                onClick={handleClick}
                size={labelSize}
            />
        </FormRow>
    )
}

Text.propTypes = {
    label: PropTypes.string,
    largeLabel: PropTypes.bool,
    name: PropTypes.string,
}

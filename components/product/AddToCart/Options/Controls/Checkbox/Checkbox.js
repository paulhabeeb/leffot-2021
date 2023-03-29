import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import {
    Checkbox as CheckboxInput,
    FormRow,
    InputLabel,
} from '@leffot/form-controls'

import { useHandleChangeContext } from '@components/product'

export default function Checkbox({ largeLabel, name, option }) {
    const { values } = useFormikContext()
    const handleChange = useHandleChangeContext()
    const labelSize = largeLabel ? 'large' : 'regular'

    const handleClick = () => {
        const newValue = !values[name]
        handleChange(name, newValue)
    }

    return (
        <FormRow>
            <InputLabel
                element='div'
                id={name}
                label={option.displayName}
                size={labelSize}
            />
            <CheckboxInput name={name} onClick={handleClick}>
                {option.label}
            </CheckboxInput>
        </FormRow>
    )
}

Checkbox.propTypes = {
    largeLabel: PropTypes.bool,
    name: PropTypes.string,
    option: PropTypes.object,
}

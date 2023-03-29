import PropTypes from 'prop-types'
import { FormRow, TextInput } from '@leffot/form-controls'

export default function BaseFields({ context, placeholder }) {
    const hideLabel = context === 'footer'

    return (
        <>
            <FormRow>
                <TextInput
                    hideLabel={hideLabel}
                    id={`mce-EMAIL-${context}`}
                    label='Email address'
                    name='email_address'
                    placeholder={placeholder}
                    type='email'
                />
            </FormRow>
        </>
    )
}

BaseFields.defaultProps = {
    placeholder: 'Your email address',
}

BaseFields.propTypes = {
    context: PropTypes.string,
    placeholder: PropTypes.string,
}

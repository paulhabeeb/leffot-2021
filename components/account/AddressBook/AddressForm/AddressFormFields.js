import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { FormRow, TextInput } from '@leffot/form-controls'
import useCountriesAndStates from '@lib/use-countries-and-states'

import { ErrorMessage } from '@components/common'
import { SubmitOrCancel } from '@components/forms/actions'
import { LongFormsLoader } from '@components/placeholders'

export default function AddressFormFields({
    buttonTitle,
    cancelAction,
    initialValues,
    schema,
    setSchema,
}) {
    const { isSubmitting, status } = useFormikContext()

    const countryField = {
        hideLabel: false,
        id: 'country_code',
        initialValue: initialValues.country,
        label: 'Country',
        name: 'country_code',
    }
    const stateField = {
        hideLabel: false,
        id: 'state_or_province',
        initialValue: initialValues.state_or_province,
        label: 'State/Province',
        name: 'state_or_province',
    }

    const { countries, error, states } = useCountriesAndStates(
        countryField,
        stateField,
        [schema, setSchema],
        false
    )

    if (countries === null) {
        if (error) {
            return <ErrorMessage message={error} />
        }

        return <LongFormsLoader />
    }

    return (
        <>
            <FormRow style='half'>
                <div>
                    <TextInput
                        label='First Name'
                        id='first_name'
                        name='first_name'
                    />
                </div>
                <div>
                    <TextInput
                        label='Last Name'
                        id='last_name'
                        name='last_name'
                    />
                </div>
            </FormRow>
            <FormRow>
                <TextInput
                    label='Company (Optional)'
                    id='company'
                    name='company'
                />
            </FormRow>
            <FormRow>
                <TextInput
                    label='Street Address'
                    id='address1'
                    name='address1'
                />
            </FormRow>
            <FormRow>
                <TextInput
                    label='Apt, Suite, Building (Optional)'
                    id='address2'
                    name='address2'
                />
            </FormRow>
            <FormRow style='third'>
                <div>
                    <TextInput label='City' id='city' name='city' />
                </div>
                <div>{states}</div>
                <div>
                    <TextInput
                        label='Post Code'
                        id='postal_code'
                        name='postal_code'
                    />
                </div>
            </FormRow>
            <FormRow>{countries}</FormRow>
            <FormRow>
                <TextInput label='Phone Number' id='phone' name='phone' />
            </FormRow>
            {status && <ErrorMessage message={status} />}
            {error && <ErrorMessage message={error} />}
            <SubmitOrCancel
                cancelAction={cancelAction}
                isSubmitting={isSubmitting}
                submitCaption={buttonTitle}
            />
        </>
    )
}

AddressFormFields.propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    cancelAction: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    schema: PropTypes.object.isRequired,
    setSchema: PropTypes.func.isRequired,
}

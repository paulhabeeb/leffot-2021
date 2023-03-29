import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { FormRow, TextInput } from '@leffot/form-controls'
import useCountriesAndStates from '@lib/use-countries-and-states'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './EstimatorFormActions.module.scss'

export default function EstimatorFormActions({ schema, setSchema }) {
    const { isSubmitting, status } = useFormikContext()

    const countryField = {
        hideLabel: false,
        id: 'country_code',
        initialValue: null,
        label: 'Country',
        name: 'country_code',
    }
    const stateField = {
        hideLabel: false,
        id: 'state_or_province',
        initialValue: null,
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

        return null
    }

    return (
        <>
            <FormRow>{countries}</FormRow>
            <FormRow>{states}</FormRow>
            <FormRow>
                <TextInput
                    id='postal_code'
                    label='Zip/Postcode'
                    name='postal_code'
                    placeholder='Enter a zip'
                    type='text'
                />
            </FormRow>
            <FormRow>
                <Button
                    caption='Estimate Shipping'
                    className={styles.button}
                    isSubmitting={isSubmitting}
                    loaderSize={16}
                />
            </FormRow>
            {error && <ErrorMessage message={error} />}
            {status && <ErrorMessage message={status.error} />}
        </>
    )
}

EstimatorFormActions.propTypes = {
    schema: PropTypes.object,
    setSchema: PropTypes.func,
}

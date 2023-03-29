import { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import * as Yup from 'yup'
import { Select, TextInput } from '@leffot/form-controls'
import recursiveAPICall from '@lib/recursive-api-call'

const REQUIRED_OPTION = 'Required'

const COUNTRY_PLACEHOLDER = 'Select a country'
const COUNTRY_SCHEMA = Yup.string()
    .required(REQUIRED_OPTION)
    .notOneOf([COUNTRY_PLACEHOLDER], REQUIRED_OPTION)

const STATE_PLACEHOLDER = 'Select a state'
const REQUIRED_STATE_SCHEMA = Yup.string()
    .required(REQUIRED_OPTION)
    .notOneOf([STATE_PLACEHOLDER], REQUIRED_OPTION)
const OPTIONAL_STATE_SCHEMA = Yup.string().notOneOf(
    [STATE_PLACEHOLDER],
    REQUIRED_OPTION
)

const sortCountries = (a, b) => {
    const aUpper = a.country.toUpperCase()
    const bUpper = b.country.toUpperCase()

    if (aUpper < bUpper) {
        return -1
    }
    if (aUpper > bUpper) {
        return 1
    }

    return 0
}

export default function useCountriesAndStates(
    countryField,
    stateField,
    schemaArray,
    useId = true
) {
    const initStates = (
        <Select
            hideLabel={stateField.hideLabel}
            id={stateField.id}
            label={stateField.label}
            name={stateField.name}
            options={[]}
            placeholder='Loading states...'
        />
    )

    const { setFieldValue } = useFormikContext()
    const [countries, setCountries] = useState(null)
    const [countryId, setCountryId] = useState(null)
    const [error, setError] = useState(null)
    const [states, setStates] = useState(initStates)
    const [schema, setSchema] = schemaArray

    const handleErr = () =>
        setError(
            'There was a problem retrieving the countries and states. Please try again later.'
        )
    const clearErr = () => setError(null)

    useEffect(() => {
        const getCountries = async () => {
            const countryData = await recursiveAPICall({
                countPath: '/api/bc-rest/countries/count',
                getPath: '/api/bc-rest/countries',
                handleErr,
                clearErr,
            })

            countryData.sort(sortCountries)

            const countryOptions = []
            let USA = {
                code: null,
                id: null,
            }
            let selectedCountry = {
                code: null,
                id: null,
            }

            countryData.forEach(country => {
                const countryName = country.country
                const countryCode = useId ? country.id : country.country_iso2
                const INITIAL_COUNTRY = countryField.initialValue || ''

                if (
                    countryName.toUpperCase() === 'UNITED STATES' ||
                    countryName.toUpperCase() === 'UNITED STATES OF AMERICA'
                ) {
                    USA = {
                        code: countryCode,
                        id: country.id,
                    }
                }

                if (
                    countryName.toUpperCase() === INITIAL_COUNTRY.toUpperCase()
                ) {
                    selectedCountry = {
                        code: countryCode,
                        id: country.id,
                    }
                }

                const key = `${country.country_iso3}${country.id}${countryName}`

                countryOptions.push(
                    <option value={countryCode} key={key}>
                        {countryName}
                    </option>
                )
            })

            const handleSelectChange = event => {
                const countryCode = event.target.value
                countryData.forEach(country => {
                    if (
                        country.country_iso2 === countryCode ||
                        country.id === parseInt(countryCode)
                    ) {
                        setCountryId(country.id)
                    }
                })
            }

            const countryComponent = (
                <Select
                    hideLabel={countryField.hideLabel}
                    id={countryField.id}
                    label={countryField.label}
                    name={countryField.name}
                    onChange={handleSelectChange}
                    options={countryOptions}
                    placeholder={COUNTRY_PLACEHOLDER}
                />
            )

            setCountryId(selectedCountry.id || USA.id || COUNTRY_PLACEHOLDER)
            setFieldValue(
                countryField.id,
                selectedCountry.code || USA.code || COUNTRY_PLACEHOLDER
            )
            setSchema({
                ...schema,
                [countryField.id]: COUNTRY_SCHEMA,
            })
            setCountries(countryComponent)
        }

        getCountries()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getStates = async countryId => {
            if (countryId === null || countryId === '') {
                return null
            }

            const statesData = await recursiveAPICall({
                countPath: `/api/bc-rest/countries/${countryId}/states/count`,
                getPath: `/api/bc-rest/countries/${countryId}/states`,
                handleErr,
                clearErr,
            })

            const INITIAL_STATE = stateField.initialValue || ''
            let selectedState = null

            if (statesData && statesData.length > 0) {
                const stateOptions = []
                statesData.forEach(state => {
                    const stateCode = useId ? state.id : state.state

                    if (
                        state.state.toUpperCase() ===
                        INITIAL_STATE.toUpperCase()
                    ) {
                        selectedState = stateCode
                    }

                    stateOptions.push(
                        <option value={stateCode} key={state.id}>
                            {state.state}
                        </option>
                    )
                })

                const stateComponent = (
                    <Select
                        hideLabel={stateField.hideLabel}
                        id={stateField.id}
                        label={stateField.label}
                        name={stateField.name}
                        options={stateOptions}
                        placeholder={STATE_PLACEHOLDER}
                    />
                )

                setFieldValue(stateField.id, selectedState || STATE_PLACEHOLDER)
                setSchema({
                    ...schema,
                    [stateField.id]: REQUIRED_STATE_SCHEMA,
                })
                setStates(stateComponent)
            } else {
                const stateComponent = (
                    <TextInput
                        id={stateField.id}
                        label={stateField.label}
                        name={stateField.name}
                        placeholder='Enter a state'
                        type='text'
                    />
                )

                setFieldValue(stateField.id, INITIAL_STATE)
                setSchema({
                    ...schema,
                    [stateField.id]: OPTIONAL_STATE_SCHEMA,
                })
                setStates(stateComponent)
            }
        }

        getStates(countryId)
    }, [countryId]) // eslint-disable-line react-hooks/exhaustive-deps

    return { countries, error, states }
}

import * as Yup from 'yup'

export const DROPDOWN_INITIAL_VALUE = 'Select an option...'

const setInitialValue = ({ option, isPreowned }) => {
    let initialValue = option.defaultValue || ''

    if (option.__typename === 'CheckboxOption') {
        initialValue = option.checkedByDefault
    }

    if (option.displayStyle === 'DropdownList') {
        initialValue = DROPDOWN_INITIAL_VALUE
    }

    if (option.values) {
        option.values.forEach(value => {
            // If it's a pre-owned shoe, we don't make the user
            // select anything. But there is an option (for size),
            // so we set it as the initial value so Formik will be ok.
            if (value.isDefault || isPreowned) {
                initialValue = value.entityId.toString()
            }
        })
    }

    return initialValue
}

const setValidationSchema = ({ option, brandName, options }) => {
    const {
        __typename,
        displayStyle,
        maxLength,
        minLength,
        isRequired,
        value,
    } = option
    const requiredMessage = 'Required'
    let validationSchema = Yup.string()
    let hatchName = null

    if (__typename === 'MultipleChoiceOption' && isRequired) {
        validationSchema = Yup.string().required(requiredMessage)

        if (displayStyle === 'DropdownList' && isRequired) {
            validationSchema = Yup.string().notOneOf(
                [DROPDOWN_INITIAL_VALUE],
                requiredMessage
            )
        }
    }
    if (__typename === 'CheckboxOption' && isRequired) {
        validationSchema = Yup.string().matches(value, {
            message: requiredMessage,
        })
    }
    if (__typename === 'TextFieldOption') {
        if (isRequired) {
            validationSchema = Yup.string().required(requiredMessage)
        }
        if (maxLength) {
            let message = 'Error!'
            if (maxLength && !minLength) {
                message = `Enter ${maxLength} characters or fewer`
            }
            if (minLength && !maxLength) {
                message = `Enter at least ${minLength} characters`
            }
            if (minLength && maxLength) {
                message = `Enter between ${minLength} and ${maxLength} characters`
            }

            validationSchema = Yup.string()
                .min(minLength || 0, message)
                .max(maxLength, message)

            if (isRequired) {
                validationSchema = Yup.string()
                    .min(minLength || 1, message)
                    .max(maxLength, message)
                    .required(requiredMessage)
            }
        }
    }
    if (
        displayStyle === 'Swatch' &&
        brandName === 'Hiro Yanagimachi' &&
        (option.displayName === 'Left' || option.displayName === 'Right')
    ) {
        let styleName = null
        let monogramValId = null

        options.forEach(opt => {
            const attributeName = opt.entityId.toString()
            if (opt.displayName === 'Style') {
                styleName = attributeName
                hatchName = attributeName
                opt.values.forEach(optVal => {
                    if (optVal.label === 'Monogram') {
                        monogramValId = optVal.entityId.toString()
                    }
                })
            }
        })

        validationSchema = Yup.string().when(styleName, (styleName, schema) => {
            // eslint-disable-line no-shadow
            // if the ID of the style attribute is equal to that of the monogram's ID
            if (styleName === monogramValId) {
                return schema.required(requiredMessage)
            }

            return schema
        })
    }

    return {
        hatchName,
        schema: validationSchema,
    }
}

export const initializeValidationSchema = ({ options, brandName }) => {
    const validationSchema = {}
    const escapeHatch = [] // https://github.com/jquense/yup/issues/176#issuecomment-369925782

    options.forEach(option => {
        const name = option.entityId.toString()
        const { hatchName, schema } = setValidationSchema({
            option,
            brandName,
            options,
        })
        validationSchema[name] = schema

        if (hatchName !== null) escapeHatch.push(hatchName)
    })

    return Yup.object().shape(validationSchema, [escapeHatch])
}

export const initializeValues = ({ options, isPreowned }) => {
    const initialValues = {}

    options.forEach(option => {
        const name = option.entityId.toString()
        initialValues[name] = setInitialValue({ option, isPreowned })
    })

    return initialValues
}

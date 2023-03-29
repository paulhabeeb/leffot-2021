import PropTypes from 'prop-types'
import { useField, useFormikContext } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import { ValidationError } from '@leffot/form-controls'

export default function Recaptcha({ name }) {
    const { setFieldValue } = useFormikContext()
    const field = useField({ name })

    const onRecaptchaComplete = value => {
        setFieldValue(name, value)
    }

    return (
        <>
            <ReCAPTCHA
                sitekey='6LdnHfQUAAAAAOeb0kwfAuA4p-yn7DP-6ZDb_yU6'
                onChange={onRecaptchaComplete}
            />
            <ValidationError meta={field[1]} />
        </>
    )
}

Recaptcha.propTypes = {
    name: PropTypes.string,
}

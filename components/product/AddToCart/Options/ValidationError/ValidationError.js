import PropTypes from 'prop-types'
import { ErrorMessage as FormikError } from 'formik'

import { ErrorMessage } from '@components/common'
import styles from './ValidationError.module.scss'

export default function ValidationError({ name }) {
    return (
        <FormikError name={name}>
            {msg => <ErrorMessage className={styles.container} message={msg} />}
        </FormikError>
    )
}

ValidationError.propTypes = {
    name: PropTypes.string,
}

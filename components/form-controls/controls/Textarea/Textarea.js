import PropTypes from 'prop-types'
import { useField } from 'formik'
import cn from 'classnames'

import { InputLabel, ValidationError } from '../../common'
import styles from './Textarea.module.scss'

export default function Textarea({ disabled, label, status, ...props }) {
    const [field, meta] = useField(props)

    return (
        <>
            <InputLabel label={label} status={status} {...props} />
            <textarea
                {...field}
                {...props}
                disabled={disabled}
                id={props.id || props.name}
                className={cn(styles.input, {
                    [styles.errorBorder]: meta.touched && meta.error,
                    [styles.disabled]: disabled,
                })}
            />
            <ValidationError meta={meta} />
        </>
    )
}

Textarea.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    status: PropTypes.string,
}

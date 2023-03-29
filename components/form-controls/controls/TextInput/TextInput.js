import PropTypes from 'prop-types'
import { useField } from 'formik'
import cn from 'classnames'

import { InputLabel, ValidationError } from '../../common'
import styles from './TextInput.module.scss'

export default function TextInput({
    disabled,
    hideLabel,
    label,
    labelChild,
    ...props
}) {
    const [field, meta] = useField(props)

    return (
        <>
            <InputLabel isVisuallyHidden={hideLabel} label={label} {...props}>
                {labelChild}
            </InputLabel>
            <input
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

TextInput.defaultProps = {
    type: 'text',
}

TextInput.propTypes = {
    disabled: PropTypes.bool,
    hideLabel: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    labelChild: PropTypes.node,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
}

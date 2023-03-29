import PropTypes from 'prop-types'
import { useField } from 'formik'
import cn from 'classnames'

import { InputLabel, ValidationError } from '../../common'
import styles from './RangeSlider.module.scss'

export default function RangeSlider({
    disabled,
    hideLabel,
    label,
    labelChild,
    ...props
}) {
    const [field, meta] = useField({
        ...props,
        type: 'range',
    })

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

RangeSlider.propTypes = {
    disabled: PropTypes.bool,
    hideLabel: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    labelChild: PropTypes.node,
    name: PropTypes.string,
}

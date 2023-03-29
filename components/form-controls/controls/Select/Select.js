/* eslint-disable jsx-a11y/no-onchange */
import PropTypes from 'prop-types'
import { useField, useFormikContext } from 'formik'
import cn from 'classnames'

import { InputLabel, ValidationError } from '../../common'
import styles from './Select.module.scss'

export default function Select({
    disabled,
    hideLabel,
    id,
    label,
    multiple,
    name,
    onChange,
    options,
    placeholder,
}) {
    const { handleChange } = useFormikContext()
    const [field, meta] = useField({
        name,
        type: 'select',
        label: id,
    })

    const placeholderEl =
        placeholder !== undefined ? (
            <option
                disabled
                key={`${id}-${placeholder}-${label}`}
                value={placeholder}
            >
                {placeholder}
            </option>
        ) : null

    const handleSelectChange = event => {
        onChange(event)
        handleChange(event)
    }

    const className = cn(styles.select, {
        [styles.multiple]: multiple,
        [styles.errorBorder]: meta.touched && meta.error,
        [styles.disabled]: disabled,
    })

    return (
        <>
            <InputLabel id={id} isVisuallyHidden={hideLabel} label={label} />
            <select
                {...field}
                disabled={disabled}
                id={id}
                multiple={multiple}
                onChange={handleSelectChange}
                className={className}
            >
                {placeholderEl}
                {options}
            </select>
            <ValidationError meta={meta} />
        </>
    )
}

Select.defaultProps = {
    hideLabel: true,
    onChange: () => undefined,
}

Select.propTypes = {
    disabled: PropTypes.bool,
    hideLabel: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
}

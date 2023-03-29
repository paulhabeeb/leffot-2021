import PropTypes from 'prop-types'
import { useField } from 'formik'
import cn from 'classnames'

import { ValidationError } from '../../common'
import styles from './Radio.module.scss'

export default function Radio({
    disabled,
    id,
    label,
    name,
    onClick,
    showError,
    style,
    value,
}) {
    const isRectangleRadio = style === 'rectangle'
    const isSwatch = style === 'swatch'

    const labelStyles = cn({
        [styles.regular]: !isRectangleRadio && !isSwatch,
        [styles.classicDisabled]: !isRectangleRadio && !isSwatch && disabled,
        [styles.rectangle]: isRectangleRadio,
        [styles.disabled]: (isRectangleRadio || isSwatch) && disabled,
        [styles.swatch]: isSwatch,
        [styles.swatchDisabled]: isSwatch && disabled,
    })

    const [field, meta] = useField({
        name,
        type: 'radio',
        value,
    })

    return (
        <>
            <input
                {...field}
                className='visuallyHidden'
                disabled={disabled}
                id={id}
                onClick={onClick}
                type='radio'
            />
            <label htmlFor={id} className={labelStyles}>
                {label}
            </label>
            {showError && <ValidationError meta={meta} />}
        </>
    )
}

Radio.defaultProps = {
    disabled: false,
    showError: false,
    style: 'regular',
}

Radio.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
    onClick: PropTypes.func,
    showError: PropTypes.bool,
    style: PropTypes.string,
    value: PropTypes.string,
}

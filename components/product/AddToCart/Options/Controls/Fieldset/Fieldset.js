import PropTypes from 'prop-types'
import cleanOptionName from '@lib/clean-option-name'
import { Fieldset as FormFieldset } from '@leffot/form-controls'
import cn from 'classnames'

import ValidationError from '../../ValidationError'
import styles from './Fieldset.module.scss'

export default function Fieldset({
    caption,
    children,
    displayName,
    largeLabel,
    name,
}) {
    const cleanedOptionname = cleanOptionName(displayName)

    const labelClassName = cn(styles.label, {
        [styles.large]: largeLabel,
    })

    return (
        <FormFieldset styles={styles.fieldset}>
            <legend
                data-option-name={cleanedOptionname}
                className={labelClassName}
            >
                <div>
                    {displayName}
                    <ValidationError name={name} />
                </div>
                {caption && <div className={styles.caption}>{caption}</div>}
            </legend>
            {children}
        </FormFieldset>
    )
}

Fieldset.propTypes = {
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
    displayName: PropTypes.string,
    largeLabel: PropTypes.bool,
    name: PropTypes.string,
}

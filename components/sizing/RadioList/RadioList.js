import PropTypes from 'prop-types'
import { Fieldset, Radio } from '@leffot/form-controls'
import cn from 'classnames'

import styles from './RadioList.module.scss'

export default function RadioList({ fieldsetId, handleChange, radios }) {
    const container = cn(styles.list, {
        [styles.sevenColumns]: fieldsetId === 'width',
    })

    return (
        <Fieldset className={styles.fieldset}>
            <ul className={container}>
                {radios.map((radio, index) => {
                    const id = `${fieldsetId}-${radio.value.toString()}`

                    return (
                        <li key={index}>
                            <Radio
                                id={id}
                                label={radio.label}
                                name={fieldsetId}
                                onClick={handleChange}
                                style='rectangle'
                                value={radio.value}
                            />
                        </li>
                    )
                })}
            </ul>
        </Fieldset>
    )
}

RadioList.propTypes = {
    fieldsetId: PropTypes.string,
    handleChange: PropTypes.func,
    radios: PropTypes.array,
}

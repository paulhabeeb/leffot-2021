import PropTypes from 'prop-types'
import OptionGrid from '../../OptionGrid'
import LeatherSwatchInput from './LeatherSwatchInput'

import styles from './LeatherSwatchSection.module.scss'

export default function LeatherSwatchSection({
    conditionals,
    leatherColor,
    name,
    option,
    swatches,
    value,
}) {
    const formValues = []
    swatches.colors.forEach((color, index) => {
        formValues.push(
            <LeatherSwatchInput
                color={color} // color from the current swatchColors array
                conditionals={conditionals}
                leatherColor={leatherColor} // prefilled leather color in bc option
                name={name} // entityId.toString()
                option={option} // base leather type option
                value={value} // Leather type value, e.g. suede, calf
                key={index}
            />
        )
    })

    const title = () => {
        if (value.label === 'Croc') {
            return 'Croc (+ $5000)'
        }
        if (value.label === 'Shell Cordovan') {
            return 'Shell Cordovan (+ $600)'
        }

        return value.label
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title()}</h3>
            <OptionGrid isSixColumns={true}>{formValues}</OptionGrid>
        </div>
    )
}

LeatherSwatchSection.propTypes = {
    conditionals: PropTypes.object,
    leatherColor: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.object,
    swatches: PropTypes.object,
    value: PropTypes.shape({
        label: PropTypes.string,
    }),
}

import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { Radio } from '@leffot/form-controls'

import { useHandleChangeContext } from '@components/product'
import formatLabel from '@lib/products/format-label'
import { getOptionLabel } from '@lib/products/options'

const SwatchColor = dynamic(() =>
    import('@leffot/form-controls').then(mod => mod.SwatchColor)
)
const SwatchImage = dynamic(() =>
    import('@leffot/form-controls').then(mod => mod.SwatchImage)
)

export default function RadioInput({
    conditionals,
    name,
    option,
    style,
    value,
}) {
    const handleChange = useHandleChangeContext()
    const handleClick = () => handleChange(name, value.entityId)

    const id = value.entityId.toString()
    const tempLabel = formatLabel(conditionals, option, value)
    const labelText = getOptionLabel(
        tempLabel,
        tempLabel,
        option.displayName.toLowerCase(),
        conditionals
    )

    const label =
        style === 'swatch' ? (
            <>
                {value.imageUrl ? (
                    <SwatchImage label={labelText} url={value.imageUrl} />
                ) : (
                    <SwatchColor hues={value.hexColors} />
                )}
                <div className='swatch-label'>{labelText}</div>
            </>
        ) : (
            labelText
        )

    return (
        <Radio
            disabled={value.disabled}
            id={id}
            label={label}
            name={name}
            onClick={handleClick}
            value={id}
            style={style}
        />
    )
}

RadioInput.propTypes = {
    conditionals: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.object,
    style: PropTypes.string,
    value: PropTypes.object,
}

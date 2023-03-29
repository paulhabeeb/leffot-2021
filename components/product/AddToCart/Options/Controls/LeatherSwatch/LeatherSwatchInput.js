import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import toSlug from '@lib/to-slug'

import { useHandleChangeContext } from '@components/product'
import { getOptionLabel } from '@lib/products/options'

import HoverSwatchInput from '../HoverSwatch/HoverSwatchInput'

export default function LeatherSwatchInput({
    color,
    conditionals,
    leatherColor,
    name,
    option,
    value,
}) {
    const { values: selectedOptions } = useFormikContext()
    const handleChange = useHandleChangeContext()

    // Since we do the leather swatches in a funny way, we have to determine
    // what's selected in a funny way, too. So we check to see if the text
    // field contains the type and color of this input's leather

    const selected = selectedOptions[leatherColor.id.toString()]
    const leatherColorLabel = `${color} ${value.label}`

    const baseUrl = `/content/${toSlug(
        conditionals.brandName
    )}/leathers/${toSlug(value.label)}/`

    const imgUrl = `${baseUrl}${toSlug(color)}-150.jpg`
    const bigImgUrl = `${baseUrl}${toSlug(color)}-500.jpg`
    const id = `${option.entityId}_${value.entityId}_${toSlug(
        leatherColorLabel
    )}`
    const label = getOptionLabel(
        color,
        leatherColorLabel,
        option.displayName.toLowerCase(),
        conditionals
    )

    const toggleOption = event => {
        // If the user is on a mobile device
        if (/Mobi/i.test(navigator.userAgent)) {
            event.preventDefault()
        }

        // Select the leather type, which controls the price
        // Croc and shell up the price
        // This is ONLY the type -- calf, suede, croc -- and does NOT include the color
        // But do this only if the leather type changes. Not if the color changes within
        // the same type. Otherwise the type will be deselected.
        if (Number(selectedOptions[name]) !== value.entityId) {
            handleChange(name, value.entityId)
        }

        // Add the leather color and type to a text input so we can
        // see it in the backend when the order is submitted
        handleChange(leatherColor.id, leatherColorLabel)
    }

    return (
        <HoverSwatchInput
            altText={leatherColorLabel}
            handleClick={toggleOption}
            id={id}
            imgUrls={{
                large: bigImgUrl,
                small: imgUrl,
            }}
            label={label}
            name={name}
            selected={selected === leatherColorLabel}
            value={value}
        />
    )
}

LeatherSwatchInput.propTypes = {
    color: PropTypes.string,
    conditionals: PropTypes.object,
    leatherColor: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.object,
    value: PropTypes.object,
}

import PropTypes from 'prop-types'
import { FormRow } from '@leffot/form-controls'
import formatLabel from '@lib/products/format-label'
import getOptionCaption from '@lib/products/get-option-caption'
import { getOptionLabel } from '@lib/products/options'
import { getImageUrl } from '@lib/products/image-swatches'
import { useHandleChangeContext } from '@components/product'

import OptionGrid from '../../OptionGrid'
import Fieldset from '../Fieldset'
import HoverSwatchInput from './HoverSwatchInput'

export default function HoverSwatch({
    conditionals,
    fields,
    largeLabel,
    mainImgUrl,
    name,
    option,
    shouldUpdateImgOnSelect,
    updateMainImgUrl,
}) {
    const handleChange = useHandleChangeContext()

    const caption = getOptionCaption({
        brand: conditionals.brandName,
        fields,
        type: conditionals.productType,
        value: option.displayName,
    })

    const formValues = []
    option.values.forEach((value, index) => {
        const id = `${option.entityId}_${value.entityId}`
        const tempLabel = formatLabel(conditionals, option, value)
        const label = getOptionLabel(
            tempLabel,
            tempLabel,
            option.displayName.toLowerCase(),
            conditionals
        )

        const imgUrl = value?.imageUrl
            ? getImageUrl(
                  tempLabel,
                  conditionals,
                  value.imageUrl,
                  option.displayName.toLowerCase(),
                  500
              )
            : null

        const handleClick = () => handleChange(name, value.entityId)

        formValues.push(
            <HoverSwatchInput
                altText={label}
                handleClick={handleClick}
                id={id}
                imgUrls={{
                    large: imgUrl,
                    small: imgUrl,
                }}
                label={label}
                mainImgUrl={mainImgUrl}
                name={name}
                shouldUpdateImgOnSelect={shouldUpdateImgOnSelect}
                updateMainImgUrl={updateMainImgUrl}
                value={value}
                key={index}
            />
        )
    })

    return (
        <FormRow>
            <Fieldset
                caption={caption}
                displayName={option.displayName}
                largeLabel={largeLabel}
                name={name}
            >
                <OptionGrid isThreeColumns={true}>{formValues}</OptionGrid>
            </Fieldset>
        </FormRow>
    )
}

HoverSwatch.propTypes = {
    conditionals: PropTypes.object,
    fields: PropTypes.object,
    largeLabel: PropTypes.bool,
    mainImgUrl: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.shape({
        displayName: PropTypes.string,
        entityId: PropTypes.number,
        values: PropTypes.arrayOf(
            PropTypes.shape({
                data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
                id: PropTypes.number,
                label: PropTypes.string,
                selected: PropTypes.bool,
            })
        ),
    }),
    shouldUpdateImgOnSelect: PropTypes.bool,
    updateMainImgUrl: PropTypes.func,
}

HoverSwatch.defaultProps = {
    shouldUpdateImgOnSelect: false,
    mainImgUrl: null,
    updateMainImgUrl: null,
}

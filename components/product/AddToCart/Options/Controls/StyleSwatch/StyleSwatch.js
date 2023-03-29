import PropTypes from 'prop-types'
import { FormRow } from '@leffot/form-controls'
import getOptionCaption from '@lib/products/get-option-caption'

import OptionGrid from '../../OptionGrid'
import Fieldset from '../Fieldset'
import StyleSwatchInput from './StyleSwatchInput'

export default function StyleSwatch({
    conditionals,
    fields,
    largeLabel,
    mainImgUrl,
    name,
    option,
    setHeight,
    shouldUpdateImgOnSelect,
    updateMainImgUrl,
}) {
    const caption = getOptionCaption({
        brand: conditionals.brandName,
        fields,
        type: conditionals.productType,
        value: option.displayName,
    })

    const formValues = []
    option.values.forEach((value, index) => {
        formValues.push(
            <StyleSwatchInput
                conditionals={conditionals}
                mainImgUrl={mainImgUrl}
                name={name}
                option={option}
                setHeight={setHeight}
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
                <OptionGrid isOneColumn={true}>{formValues}</OptionGrid>
            </Fieldset>
        </FormRow>
    )
}

StyleSwatch.propTypes = {
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
    setHeight: PropTypes.func,
    shouldUpdateImgOnSelect: PropTypes.bool,
    updateMainImgUrl: PropTypes.func,
}

StyleSwatch.defaultProps = {
    mainImgUrl: null,
    shouldUpdateImgOnSelect: false,
    updateMainImgUrl: null,
}

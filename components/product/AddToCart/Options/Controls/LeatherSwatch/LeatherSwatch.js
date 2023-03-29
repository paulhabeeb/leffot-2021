import { useState } from 'react'
import PropTypes from 'prop-types'
import { FormRow } from '@leffot/form-controls'
import { getLeatherColor, getLeathers } from '@lib/products/leather-swatch'
import getOptionCaption from '@lib/products/get-option-caption'

import { OverflowSection } from '@components/common'
import Fieldset from '../Fieldset'
import LeatherSwatchSection from './LeatherSwatchSection'

export default function LeatherSwatch({
    conditionals,
    largeLabel,
    name,
    option,
    productOptions,
}) {
    const [leatherColor] = useState(getLeatherColor(option, productOptions))
    const leathers = getLeathers(conditionals.brandName)
    const caption = getOptionCaption({
        brand: conditionals.brandName,
        type: conditionals.productType,
        value: option.displayName,
    })

    const formValues = []
    option.values.forEach((value, index) => {
        formValues.push(
            <LeatherSwatchSection
                conditionals={conditionals}
                leatherColor={leatherColor}
                name={name}
                option={option}
                swatches={leathers[value.label]}
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
                {formValues.length > 2 ? (
                    <OverflowSection
                        hasTopPadding={true}
                        options={formValues}
                        split={2}
                    />
                ) : (
                    <>{formValues}</>
                )}
            </Fieldset>
        </FormRow>
    )
}

LeatherSwatch.propTypes = {
    conditionals: PropTypes.object,
    largeLabel: PropTypes.bool,
    name: PropTypes.string,
    option: PropTypes.shape({
        displayName: PropTypes.string,
        id: PropTypes.number,
        values: PropTypes.arrayOf(
            PropTypes.shape({
                data: PropTypes.string,
                id: PropTypes.number,
                label: PropTypes.string,
                selected: PropTypes.bool,
            })
        ),
    }),
    productOptions: PropTypes.array,
}

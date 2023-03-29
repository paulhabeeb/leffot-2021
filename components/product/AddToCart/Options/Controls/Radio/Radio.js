import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { FormRow } from '@leffot/form-controls'
import cleanOptionName from '@lib/clean-option-name'
import getOptionCaption from '@lib/products/get-option-caption'

import OptionGrid from '../../OptionGrid'
import Fieldset from '../Fieldset'
import RadioInput from './RadioInput'

const ShoeTreeImage = dynamic(() => import('./ShoeTreeImage'))

export default function Radio({
    conditionals,
    fields,
    largeLabel,
    name,
    option,
    style,
}) {
    const cleanedOptionName = cleanOptionName(option.displayName)
    const caption = getOptionCaption({
        brand: conditionals.brandName,
        fields,
        type: conditionals.productType,
        value: option.displayName,
    })

    const formValues = []
    option.values.forEach((value, index) => {
        formValues.push(
            <RadioInput
                conditionals={conditionals}
                name={name}
                option={option}
                style={style}
                value={value}
                key={index}
            />
        )
    })

    const isFourColumns = style === 'swatch'
    const isTwoColumns = conditionals.brandName === 'Edward Green'

    return (
        <FormRow>
            <Fieldset
                caption={caption}
                displayName={option.displayName}
                largeLabel={largeLabel}
                name={name}
            >
                {cleanedOptionName === 'Add Shoe Trees' && (
                    <ShoeTreeImage brandName={conditionals.brandName} />
                )}
                <OptionGrid
                    isFourColumns={isFourColumns}
                    isTwoColumns={isTwoColumns}
                >
                    {formValues}
                </OptionGrid>
            </Fieldset>
        </FormRow>
    )
}

Radio.propTypes = {
    conditionals: PropTypes.object,
    fields: PropTypes.object,
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
    style: PropTypes.string,
}

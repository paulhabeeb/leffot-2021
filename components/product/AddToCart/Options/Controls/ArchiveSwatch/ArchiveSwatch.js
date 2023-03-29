import PropTypes from 'prop-types'
import { FormRow } from '@leffot/form-controls'
import getOptionCaption from '@lib/products/get-option-caption'

import { OverflowSection } from '@components/common'
import OptionGrid from '../../OptionGrid'
import Fieldset from '../Fieldset'
import ArchiveSwatchInput from './ArchiveSwatchInput'

export default function ArchiveSwatch({
    conditionals,
    fields,
    largeLabel,
    name,
    option,
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
            <ArchiveSwatchInput
                conditionals={conditionals}
                name={name}
                option={option}
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
                <OptionGrid isOneColumn={true}>
                    {formValues.length > 6 &&
                    option.displayName !== 'Lining' ? (
                        <OverflowSection options={formValues} split={4} />
                    ) : (
                        <>{formValues}</>
                    )}
                </OptionGrid>
            </Fieldset>
        </FormRow>
    )
}

ArchiveSwatch.propTypes = {
    conditionals: PropTypes.object,
    fields: PropTypes.object,
    largeLabel: PropTypes.bool,
    name: PropTypes.string,
    option: PropTypes.shape({
        displayName: PropTypes.string,
        id: PropTypes.number,
        values: PropTypes.arrayOf(
            PropTypes.shape({
                data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
                id: PropTypes.number,
                label: PropTypes.string,
                selected: PropTypes.bool,
            })
        ),
    }),
}

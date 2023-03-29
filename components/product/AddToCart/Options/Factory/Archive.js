import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useProductContext } from '@components/product'
import { hasChange } from '@lib/regex'

const ArchiveSwatch = dynamic(() => import('../Controls/ArchiveSwatch'))
const Checkbox = dynamic(() => import('../Controls/Checkbox'))
const LeatherSwatch = dynamic(() => import('../Controls/LeatherSwatch'))
const Radio = dynamic(() => import('../Controls/Radio'))
const Select = dynamic(() => import('../Controls/Select'))
const Text = dynamic(() => import('../Controls/Text'))
import styles from './Archive.module.scss'

export default function ArchiveFactory({ conditionals, fields }) {
    const { availableOptions } = useProductContext()
    const regexHasChange = RegExp(hasChange)

    const formOptions = []
    availableOptions.forEach((option, index) => {
        const { __typename, displayName, displayStyle, entityId } = option
        const name = entityId.toString()

        // Archive products have a bunch of checkbox fields that we use to control
        // price behind the scenes (e.g., if selecting a combination of options makes
        // the shoe cost more, we toggle the checkbox -- this is more complex than what
        // BigCommerce allows us to do, which is why we handle it in JS). We don't want
        // to show those checkboxes to the user, but we do want to show all the others.
        if (
            __typename === 'CheckboxOption' &&
            !regexHasChange.test(displayName.toLowerCase())
        ) {
            formOptions.push(
                <Checkbox
                    largeLabel={true}
                    name={name}
                    option={option}
                    key={index}
                />
            )
        }

        // Because there are so many different leather options, we don't upload them all
        // as variants to BigCommerce. It makes the product take forever to load in BC, and
        // it takes way too much time to create the product in the first place. So we just
        // add the different *types* of leather (calf, suede, utah, etc), and grab the colors
        // from a JS file (will be Prismic in the future).
        //
        // Because of all this, when the customer purchases a shoe, the color they selected
        // isn't displayed in the backend. To fix this, we add a text field called Leather Color,
        // which we set whenever they select a leather. But we don't want to show this field
        // to the user -- it's just controlled invisibly. But we *do* want to show all the
        // other text fields.
        if (
            __typename === 'TextFieldOption' &&
            !displayName.includes('Leather Color')
        ) {
            formOptions.push(
                <Text
                    label={displayName}
                    largeLabel={true}
                    name={name}
                    key={index}
                />
            )
        }
        if (__typename === 'MultipleChoiceOption') {
            const controlOptions = {
                conditionals,
                fields,
                largeLabel: true,
                name,
                option,
            }

            if (displayStyle === 'RectangleBoxes') {
                controlOptions.style = 'rectangle'
            }
            if (displayStyle === 'Swatch') {
                controlOptions.style = 'swatch'
            }

            if (displayStyle === 'DropdownList') {
                formOptions.push(<Select {...controlOptions} key={index} />)
            } else if (
                displayStyle === 'RectangleBoxes' &&
                displayName.includes('Leather')
            ) {
                formOptions.push(
                    <LeatherSwatch
                        {...controlOptions}
                        productOptions={availableOptions}
                        key={index}
                    />
                )
            } else if (displayStyle === 'Swatch') {
                formOptions.push(
                    <ArchiveSwatch {...controlOptions} key={index} />
                )
            } else {
                formOptions.push(<Radio {...controlOptions} key={index} />)
            }
        }
    })

    return <div className={styles.container}>{formOptions}</div>
}

ArchiveFactory.propTypes = {
    conditionals: PropTypes.object,
    fields: PropTypes.object,
}

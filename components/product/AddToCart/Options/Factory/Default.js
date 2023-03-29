import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useProductContext } from '@components/product'

const Checkbox = dynamic(() => import('../Controls/Checkbox'))
const Radio = dynamic(() => import('../Controls/Radio'))
const Select = dynamic(() => import('../Controls/Select'))
const Text = dynamic(() => import('../Controls/Text'))
import styles from './Default.module.scss'

export default function Default({ conditionals }) {
    const { availableOptions } = useProductContext()

    const formOptions = []
    availableOptions.forEach((option, index) => {
        const { __typename, displayStyle, entityId } = option
        const name = entityId.toString()

        if (__typename === 'MultipleChoiceOption') {
            const controlOptions = {
                conditionals,
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
            } else {
                formOptions.push(<Radio {...controlOptions} key={index} />)
            }
        }
        if (__typename === 'CheckboxOption') {
            formOptions.push(
                <Checkbox name={name} option={option} key={index} />
            )
        }
        if (__typename === 'TextFieldOption') {
            formOptions.push(
                <Text label={option.displayName} name={name} key={index} />
            )
        }
    })

    return <div className={styles.container}>{formOptions}</div>
}

Default.propTypes = {
    conditionals: PropTypes.object,
}

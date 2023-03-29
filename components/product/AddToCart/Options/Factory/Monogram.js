import { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import AnimateHeight from 'react-animate-height'
import { InputLabel } from '@leffot/form-controls'
import { hasChange } from '@lib/regex'
import { useProductContext } from '@components/product'

import styles from './Monogram.module.scss'

const ArchiveSwatch = dynamic(() => import('../Controls/ArchiveSwatch'))
const Checkbox = dynamic(() => import('../Controls/Checkbox'))
const HoverSwatch = dynamic(() => import('../Controls/HoverSwatch'))
const LeatherSwatch = dynamic(() => import('../Controls/LeatherSwatch'))
const Monogram = dynamic(() => import('../Controls/Monogram'))
const Radio = dynamic(() => import('../Controls/Radio'))
const Select = dynamic(() => import('../Controls/Select'))
const StyleSwatch = dynamic(() => import('../Controls/StyleSwatch'))
const Text = dynamic(() => import('../Controls/Text'))

export default function MonogramFactory({ conditionals, fields }) {
    const { availableOptions } = useProductContext()
    const [height, setHeight] = useState(0)
    const [mainImgUrl, updateMainImgUrl] = useState({
        base: '/content/hiro-yanagimachi/styles-and-colors/{:style}-{:color}-2000x2000.jpg',
        style: 'tassel',
        color: null,
    })
    const regexHasChange = RegExp(hasChange)

    const formOptions = []
    const separateOptions = []
    availableOptions.forEach((option, index) => {
        const { __typename, displayName, displayStyle, entityId } = option
        const name = entityId.toString()

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
        if (__typename === 'TextFieldOption') {
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
                if (displayName === 'Right' || displayName === 'Left') {
                    separateOptions.push(
                        <Monogram
                            {...controlOptions}
                            mainImgUrl={mainImgUrl}
                            key={index}
                        />
                    )
                } else if (displayName === 'Color') {
                    formOptions.push(
                        <HoverSwatch
                            {...controlOptions}
                            mainImgUrl={mainImgUrl}
                            shouldUpdateImgOnSelect={true}
                            updateMainImgUrl={updateMainImgUrl}
                            key={index}
                        />
                    )
                } else if (displayName === 'Style') {
                    formOptions.push(
                        <StyleSwatch
                            {...controlOptions}
                            mainImgUrl={mainImgUrl}
                            setHeight={setHeight}
                            shouldUpdateImgOnSelect={true}
                            updateMainImgUrl={updateMainImgUrl}
                            key={index}
                        />
                    )
                } else {
                    formOptions.push(
                        <ArchiveSwatch {...controlOptions} key={index} />
                    )
                }
            } else {
                formOptions.push(<Radio {...controlOptions} key={index} />)
            }
        }
    })

    return (
        <div className={styles.container}>
            {formOptions}
            <AnimateHeight
                duration={200}
                height={height}
                className='product-options'
            >
                <div>
                    <InputLabel element='div' label='Monogram' size='large' />
                    <div className={styles.monogramContainer}>
                        {separateOptions}
                    </div>
                </div>
            </AnimateHeight>
        </div>
    )
}

MonogramFactory.propTypes = {
    conditionals: PropTypes.object,
    fields: PropTypes.object,
    product: PropTypes.object,
}

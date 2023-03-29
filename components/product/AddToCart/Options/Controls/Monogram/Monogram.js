import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { getImageUrl } from '@lib/products/image-swatches'
import useOutsideAlerter from '@lib/use-outside-alerter'

import ValidationError from '../../ValidationError'
import MonogramSwatch from './MonogramSwatch'
import styles from './Monogram.module.scss'

export default function Monogram({ conditionals, mainImgUrl, name, option }) {
    const [isOpen, setIsOpen] = useState(false)
    const monogramRef = useRef(null)
    const monogramAlerter = () => setIsOpen(false)
    useOutsideAlerter(monogramRef, monogramAlerter)

    const [selectedLetter, setSelectedLetter] = useState(null)

    const newConditionals = {
        ...conditionals,
        selectedColor: mainImgUrl.color,
    }

    const formValues = []
    option.values.forEach((value, index) => {
        formValues.push(
            <MonogramSwatch
                conditionals={conditionals}
                imageWidth={50}
                name={name}
                option={option}
                setIsOpen={setIsOpen}
                setSelectedLetter={setSelectedLetter}
                styles={{
                    outerContainer: styles.archiveSwatchOuter,
                    innerContainer: styles.archiveSwatchInner,
                }}
                value={value}
                key={index}
            />
        )
    })

    const footImgUrl = getImageUrl(
        option.displayName.toLowerCase(),
        newConditionals,
        null,
        'monogram',
        250
    )

    const letterImgUrl = selectedLetter
        ? `/content/hiro-yanagimachi/letters/${selectedLetter.toLowerCase()}.jpg`
        : null

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.imageContainer}>
                <img src={footImgUrl} alt={option.displayName} />
            </div>
            <div className={styles.container}>
                <legend className={styles.legend}>
                    {option.displayName}
                    <ValidationError name={name} />
                </legend>
                <div
                    className={styles.optionContainer}
                    id={`form-field-${option.entityId}`}
                    ref={monogramRef}
                >
                    <button
                        className={styles.toggleButton}
                        onClick={() => setIsOpen(!isOpen)}
                        type='button'
                    >
                        {selectedLetter !== null ? (
                            <span className={styles.selectedLetterContainer}>
                                <img
                                    alt=''
                                    className={styles.selectedLetterImage}
                                    src={letterImgUrl}
                                />
                                {selectedLetter}
                            </span>
                        ) : (
                            'Select a letter'
                        )}
                    </button>
                    {isOpen && (
                        <div className={styles.options}>{formValues}</div>
                    )}
                </div>
            </div>
        </fieldset>
    )
}

Monogram.propTypes = {
    conditionals: PropTypes.object,
    mainImgUrl: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.shape({
        displayName: PropTypes.string,
        entityId: PropTypes.number,
        partial: PropTypes.string,
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

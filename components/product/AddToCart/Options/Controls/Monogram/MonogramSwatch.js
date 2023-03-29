import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import ArchiveSwatchInput from '../ArchiveSwatch/ArchiveSwatchInput'

export default function MonogramSwatch({
    conditionals,
    imageWidth,
    name,
    option,
    setIsOpen,
    setSelectedLetter,
    styles,
    value,
}) {
    const { values } = useFormikContext()

    const handleClick = label => {
        if (setSelectedLetter !== null) {
            let newSelectedLetter = label

            if (values[name].toString() === value.entityId.toString()) {
                newSelectedLetter = null
            }

            setIsOpen(false)
            setSelectedLetter(newSelectedLetter)
        }
    }

    return (
        <ArchiveSwatchInput
            conditionals={conditionals}
            handleClick={handleClick}
            imageWidth={imageWidth}
            name={name}
            option={option}
            setSelectedLetter={setSelectedLetter}
            styles={styles}
            value={value}
        />
    )
}

MonogramSwatch.propTypes = {
    conditionals: PropTypes.object,
    imageWidth: PropTypes.number,
    name: PropTypes.string,
    option: PropTypes.object,
    setIsOpen: PropTypes.func,
    setSelectedLetter: PropTypes.func,
    styles: PropTypes.object,
    value: PropTypes.object,
}

MonogramSwatch.defaultProps = {
    imageWidth: 100,
    setSelectedLetter: null,
    styles: {
        innerContainer: null,
        input: null,
        outerContainer: null,
    },
}

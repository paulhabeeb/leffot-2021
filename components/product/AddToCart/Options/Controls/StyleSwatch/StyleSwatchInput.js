import PropTypes from 'prop-types'
import updateImgOnSelect from '@lib/products/update-img-on-select'
import { useProductContext } from '@components/product'
import ArchiveSwatchInput from '../ArchiveSwatch/ArchiveSwatchInput'

export default function StyleSwatchInput({
    conditionals,
    mainImgUrl,
    name,
    option,
    setHeight,
    shouldUpdateImgOnSelect,
    updateMainImgUrl,
    value,
}) {
    const { defaultImage, setImageIsLoading, setDefaultImage } =
        useProductContext()

    const newConditionals = {
        ...conditionals,
        selectedColor: mainImgUrl.color,
    }

    const handleClick = label => {
        // If we want to change the main image after selecting this value
        if (shouldUpdateImgOnSelect) {
            updateImgOnSelect(
                {
                    label,
                    labelType: 'style',
                    altText: label,
                },
                [mainImgUrl, updateMainImgUrl],
                [setImageIsLoading, defaultImage, setDefaultImage]
            )
        }

        const newHeight = label !== 'Monogram' ? 0 : 'auto'

        setHeight(newHeight)
    }

    return (
        <ArchiveSwatchInput
            conditionals={newConditionals}
            handleClick={handleClick}
            name={name}
            option={option}
            value={value}
        />
    )
}

StyleSwatchInput.propTypes = {
    conditionals: PropTypes.object,
    mainImgUrl: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.object,
    setHeight: PropTypes.func,
    shouldUpdateImgOnSelect: PropTypes.bool,
    updateMainImgUrl: PropTypes.func,
    value: PropTypes.object,
}

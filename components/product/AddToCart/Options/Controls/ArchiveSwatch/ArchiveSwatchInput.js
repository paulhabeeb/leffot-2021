import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Image from "next/legacy/image"
import { useField } from 'formik'
import cn from 'classnames'

import { useHandleChangeContext } from '@components/product'
import toSlug from '@lib/to-slug'
import formatLabel from '@lib/products/format-label'
import { getImageUrl } from '@lib/products/image-swatches'
import { getOptionLabel } from '@lib/products/options'
import valueCaptions from '@lib/products/value-captions'
import s from './ArchiveSwatchInput.module.scss'

const SwatchColor = dynamic(() =>
    import('@leffot/form-controls').then(mod => mod.SwatchColor)
)

export default function ArchiveSwatchInput({
    conditionals,
    handleClick,
    imageWidth,
    name,
    option,
    styles,
    value,
}) {
    const id = value.entityId.toString()
    const tempLabel = formatLabel(conditionals, option, value)
    const label = getOptionLabel(
        tempLabel,
        tempLabel,
        option.displayName.toLowerCase(),
        conditionals
    )
    const caption = valueCaptions[tempLabel] || tempLabel

    const handleChange = useHandleChangeContext()
    const onClick = () => {
        if (handleClick !== null) {
            handleClick(tempLabel)
        }

        handleChange(name, value.entityId)
    }

    const [field] = useField({
        name,
        type: 'radio',
        value: id,
    })

    const brandSlug = toSlug(conditionals.brandName)
    const optionSlug = option.displayName.includes('Toe Plates')
        ? toSlug('Toe Plate')
        : toSlug(option.displayName)
    const labelSlug = toSlug(tempLabel)

    let imageUrl = ''
    if (value.imageUrl) {
        imageUrl = value.imageUrl

        if (
            conditionals.brandName === 'Edward Green' ||
            conditionals.brandName === 'Gaziano & Girling' ||
            conditionals.brandName === 'Corthay'
        ) {
            // imageUrl = `/content/${brandSlug}/${optionSlug}s/${labelSlug}-${imageWidth}.jpg`
            imageUrl = `/content/${brandSlug}/${optionSlug}s/${labelSlug}-500.jpg`
        }

        if (conditionals.brandName === 'Hiro Yanagimachi') {
            imageUrl = getImageUrl(
                tempLabel,
                conditionals,
                value.imageUrl,
                option.displayName.toLowerCase(),
                500
            )
        }
    }

    const labelClass = cn(s.label, styles.outerContainer)
    const wrapperClass = cn(s.wrapper, styles.innerContainer)
    const imageContainer = {
        flexBasis: imageWidth,
        width: imageWidth,
    }
    const imageStyles = {
        maxWidth: imageWidth,
        mixBlendMode: 'multiply',
        width: imageWidth,
    }

    return (
        <>
            <input
                {...field}
                className='visuallyHidden'
                disabled={value.disabled}
                id={id}
                onClick={onClick}
                type='radio'
            />
            <label htmlFor={id} className={labelClass}>
                <div className={s.overlay}></div>
                <div className={wrapperClass}>
                    <div style={imageContainer}>
                        {value.imageUrl ? (
                            <Image
                                alt={tempLabel}
                                height={imageWidth}
                                src={imageUrl}
                                style={imageStyles}
                                width={imageWidth}
                            />
                        ) : (
                            <SwatchColor hues={value.hexColors} />
                        )}
                    </div>
                    <div className={s.text}>
                        <h3 className={s.title}>{label}</h3>
                        {caption !== tempLabel && (
                            <p className={s.caption}>{caption}</p>
                        )}
                    </div>
                </div>
            </label>
        </>
    )
}

ArchiveSwatchInput.propTypes = {
    conditionals: PropTypes.object,
    handleClick: PropTypes.func,
    imageWidth: PropTypes.number,
    mainImgUrl: PropTypes.object,
    name: PropTypes.string,
    option: PropTypes.object,
    setSelectedLetter: PropTypes.func,
    styles: PropTypes.object,
    value: PropTypes.object,
}

ArchiveSwatchInput.defaultProps = {
    handleClick: null,
    imageWidth: 100,
    mainImgUrl: null,
    setSelectedLetter: null,
    styles: {
        innerContainer: null,
        input: null,
        outerContainer: null,
    },
}

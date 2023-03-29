import PropTypes from 'prop-types'
import Image from "next/legacy/image"

import cn from 'classnames'
import styles from './FigureWithMultiply.module.scss'

function MultiplyImage({ alt, hasSecondImage, index, sizes, url }) {
    const imageStyles = cn(styles.image, {
        [styles.oneOfTwo]: index === 1 && hasSecondImage,
        [styles.twoOfTwo]: index === 2,
    })

    const imageProps = {
        className: imageStyles,
        height: 900,
        layout: 'responsive',
        objectFit: 'contain',
        objectPosition: 'center',
        sizes,
        src: url,
        width: 900,
    }

    return <Image alt={alt} {...imageProps} />
}

MultiplyImage.propTypes = {
    alt: PropTypes.string,
    hasSecondImage: PropTypes.bool,
    index: PropTypes.number,
    sizes: PropTypes.string,
    url: PropTypes.string,
}

export default function FigureWithMultiply({ images, mainAlt, sizes }) {
    const length = images?.length
    const imageURL = images?.[0]?.urlOriginal || '/ProductPlaceholder.gif'
    const imageAlt = mainAlt || images?.[0]?.alt || 'Product image coming soon'

    let hover = null
    if (length > 1) {
        let index = 3

        // Always use the fourth image unless we don't have four,
        // then use the last image
        if (length === 3 || length === 2) {
            index = length - 1
        }

        const hoverImageURL = images[index].urlOriginal
        const hoverImageAlt = images[index].description || ''

        hover = (
            <MultiplyImage
                alt={hoverImageAlt}
                index={2}
                sizes={sizes}
                url={hoverImageURL}
            />
        )
    }

    return (
        <figure className={styles.figureWithMultiply}>
            <div className={styles.imageWrapper}>
                <MultiplyImage
                    alt={imageAlt}
                    hasSecondImage={hover !== null}
                    index={1}
                    sizes={sizes}
                    url={imageURL}
                />
                {hover}
            </div>
        </figure>
    )
}

FigureWithMultiply.defaultProps = {
    sizes: '50vw',
}

FigureWithMultiply.propTypes = {
    images: PropTypes.array,
    mainAlt: PropTypes.string,
    sizes: PropTypes.string,
}

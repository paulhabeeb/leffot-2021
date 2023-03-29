import PropTypes from 'prop-types'

import styles from './BackgroundImage.module.scss'

export default function BackgroundImage({ backgroundImages }) {
    let sourceImages = []
    let mainImage = null

    backgroundImages.forEach((image, index) => {
        if (image.breakpoint !== null) {
            sourceImages.push(
                <source
                    key={index}
                    media={`(${image.breakpoint})`}
                    srcSet={image.background_image.url}
                />
            )
        } else {
            mainImage = (
                <img
                    alt={image.background_image.alt}
                    className={styles.image}
                    height={image.background_image.dimensions.height}
                    src={image.background_image.url}
                    width={image.background_image.dimensions.width}
                />
            )
        }
    })

    return (
        <div className={styles.container}>
            <picture>
                {sourceImages}
                {mainImage}
            </picture>
        </div>
    )
}

BackgroundImage.propTypes = {
    backgroundImages: PropTypes.array,
}

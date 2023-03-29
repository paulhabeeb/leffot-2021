import PropTypes from 'prop-types'
import Image from "next/legacy/image"

import cn from 'classnames'
import styles from './PromoFigure.module.scss'

export default function PromoFigure({ image, isLarge, video }) {
    if (video?.html) {
        const videoStyles = cn(
            {
                [styles.large]: isLarge,
                [styles.small]: !isLarge,
            },
            styles.video
        )

        return (
            <div className={videoStyles}>
                <div dangerouslySetInnerHTML={{ __html: video.html }} />
            </div>
        )
    }

    return (
        <div
            className={cn({
                [styles.large]: isLarge,
                [styles.small]: !isLarge,
            })}
        >
            <Image
                alt={image.alt || ''}
                height={image.dimensions.height}
                layout='responsive'
                objectFit='contain'
                objectPosition='center'
                src={image.url}
                width={image.dimensions.width}
            />
        </div>
    )
}

PromoFigure.defaultProps = {
    isLarge: false,
}

const imagePropTypes = PropTypes.shape({
    alt: PropTypes.string,
    dimensions: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
    }),
    url: PropTypes.string,
})

PromoFigure.propTypes = {
    image: PropTypes.shape({
        alt: PropTypes.string,
        dimensions: PropTypes.shape({
            height: PropTypes.number,
            width: PropTypes.number,
        }),
        large: imagePropTypes,
        medium: imagePropTypes,
        small: imagePropTypes,
        url: PropTypes.string,
        xlarge: imagePropTypes,
        xsmall: imagePropTypes,
    }),
    isLarge: PropTypes.bool,
    video: PropTypes.object,
}

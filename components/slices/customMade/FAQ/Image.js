import PropTypes from 'prop-types'

import styles from './Image.module.scss'

export default function Image({ image }) {
    const srcset = `${image.url} 2000w, ${image.xlarge.url} 1600w, ${image.large.url} 1366w, ${image.small.url} 1250w`
    const sizes = '(min-width: 1200px) 1200px, 800px'

    return (
        <figure className={styles.container}>
            <img src={image.small.url} srcSet={srcset} sizes={sizes} alt='' />
        </figure>
    )
}

Image.propTypes = {
    image: PropTypes.shape({
        dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        alt: PropTypes.string,
        url: PropTypes.string,
        large: PropTypes.shape({
            dimensions: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
            }),
            alt: PropTypes.string,
            url: PropTypes.string,
        }),
        small: PropTypes.shape({
            dimensions: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
            }),
            alt: PropTypes.string,
            url: PropTypes.string,
        }),
        xlarge: PropTypes.shape({
            dimensions: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
            }),
            alt: PropTypes.string,
            url: PropTypes.string,
        }),
    }),
}

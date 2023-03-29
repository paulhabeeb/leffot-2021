import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './PageHeader.module.scss'

export default function PageHeader({
    backgroundImage,
    highlight,
    caption,
    title,
}) {
    const bgStyle = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})` }
        : null

    const backgroundImageStyles = cn({
        [styles.backgroundImage]: backgroundImage,
    })

    const containerStyles = cn(styles.container, {
        [styles.backgroundImageOverlay]: backgroundImage,
    })

    const titleStyles = cn(styles.title, {
        [styles.backgroundImageTitle]: backgroundImage,
    })

    const captionStyles = cn(styles.caption, {
        [styles.backgroundImageTitle]: backgroundImage,
    })

    return (
        <div className={backgroundImageStyles} style={bgStyle} role='banner'>
            <div className={containerStyles}>
                <div className={styles.insideWrapper}>
                    {highlight && (
                        <div className={styles.highlight}>{highlight}</div>
                    )}
                    <h1 className={titleStyles}>{title}</h1>
                    {caption && <div className={captionStyles}>{caption}</div>}
                </div>
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    backgroundImage: PropTypes.oneOfType([
        PropTypes.shape({
            dimensions: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
            }),
            alt: PropTypes.string,
            copyright: PropTypes.string,
            url: PropTypes.string,
            small: PropTypes.shape({
                dimensions: PropTypes.shape({
                    width: PropTypes.number,
                    height: PropTypes.number,
                }),
                alt: PropTypes.string,
                copyright: PropTypes.string,
                url: PropTypes.string,
            }),
        }),
        PropTypes.string,
    ]),
    highlight: PropTypes.string,
    caption: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    title: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                text: PropTypes.string,
                spans: PropTypes.array,
            })
        ),
        PropTypes.node,
        PropTypes.string,
    ]),
}

PageHeader.defaultProps = {
    backgroundImage: null,
    highlight: null,
    caption: null,
}

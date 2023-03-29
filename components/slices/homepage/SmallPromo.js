import PropTypes from 'prop-types'

import PromoArticle from './PromoArticle'
import PromoButton from './PromoButton'
import PromoFigure from './PromoFigure'
import PromoText from './PromoText'
import PromoTextContainer from './PromoTextContainer'

export default function SmallPromo({
    buttonAriaLabel,
    buttonLink,
    buttonText,
    caption,
    image,
    title,
    video,
}) {
    const articleStyles = { marginBottom: 'var(--spacing-single)' }

    return (
        <PromoArticle styles={articleStyles}>
            <PromoFigure image={image} video={video} />
            <PromoTextContainer>
                <PromoText caption={caption} title={title} />
                <PromoButton
                    ariaLabel={buttonAriaLabel}
                    buttonText={buttonText}
                    link={buttonLink}
                />
            </PromoTextContainer>
        </PromoArticle>
    )
}

SmallPromo.propTypes = {
    buttonAriaLabel: PropTypes.string,
    buttonLink: PropTypes.object,
    buttonText: PropTypes.array,
    caption: PropTypes.array,
    image: PropTypes.object,
    title: PropTypes.array,
    video: PropTypes.object,
}

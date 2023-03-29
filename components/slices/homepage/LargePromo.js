import PropTypes from 'prop-types'

import LargePromoContainer from './LargePromoContainer'
import PromoArticle from './PromoArticle'
import PromoButton from './PromoButton'
import PromoFigure from './PromoFigure'
import PromoText from './PromoText'
import PromoTextContainer from './PromoTextContainer'

const getBackgroundColor = (standardColor, customColor) => {
    if (customColor !== null) {
        return customColor
    }
    if (standardColor === 'White') {
        return 'var(--color-white)'
    }
    if (standardColor === 'Gold') {
        return 'var(--color-primary)'
    }
    if (standardColor === 'Rust') {
        return 'var(--color-rust)'
    }

    return 'var(--color-white)'
}

export default function LargePromo({
    backgroundColor,
    buttonAriaLabel,
    buttonLink,
    buttonText,
    caption,
    customBackgroundColor,
    image,
    index,
    title,
    video,
}) {
    const newIndex = index + 1
    const calculatedBgColor = getBackgroundColor(
        backgroundColor,
        customBackgroundColor
    )
    const articleStyles = { backgroundColor: calculatedBgColor }

    return (
        <PromoArticle styles={articleStyles}>
            <LargePromoContainer index={newIndex}>
                <PromoFigure image={image} isLarge={true} video={video} />
                <PromoTextContainer
                    index={newIndex}
                    isLarge={true}
                    wrapperBackground={calculatedBgColor}
                >
                    <PromoText caption={caption} size='large' title={title} />
                    <PromoButton
                        ariaLabel={buttonAriaLabel}
                        buttonText={buttonText}
                        isDark={calculatedBgColor === 'var(--color-primary)'}
                        isLargePromo={true}
                        link={buttonLink}
                    />
                </PromoTextContainer>
            </LargePromoContainer>
        </PromoArticle>
    )
}

LargePromo.propTypes = {
    backgroundColor: PropTypes.string,
    buttonAriaLabel: PropTypes.string,
    buttonLink: PropTypes.object,
    buttonText: PropTypes.array,
    caption: PropTypes.array,
    customBackgroundColor: PropTypes.string,
    image: PropTypes.object,
    index: PropTypes.number,
    title: PropTypes.array,
    video: PropTypes.object,
}

import PropTypes from 'prop-types'
import cn from 'classnames'

import BackgroundImage from './BackgroundImage'
import Button from './Button'
import Text from './Text'
import styles from './LinkedCallout.module.scss'

export default function LinkedCallout({
    background_images,
    button_link,
    button_text,
    caption,
    title,
    toggleModal,
    isOneCol,
}) {
    const container = cn(styles.container, {
        [styles.twoGrid]: !isOneCol,
    })

    return (
        <li className={container}>
            <Text
                backgroundImages={background_images}
                caption={caption}
                title={title}
            >
                <Button
                    buttonText={button_text}
                    linkUrl={button_link}
                    toggleModal={toggleModal}
                />
            </Text>
            {background_images && (
                <BackgroundImage backgroundImages={background_images} />
            )}
        </li>
    )
}

LinkedCallout.propTypes = {
    background_images: PropTypes.array,
    button_link: PropTypes.object,
    button_text: PropTypes.string,
    caption: PropTypes.array,
    isOneCol: PropTypes.bool,
    title: PropTypes.array,
    toggleModal: PropTypes.func,
}

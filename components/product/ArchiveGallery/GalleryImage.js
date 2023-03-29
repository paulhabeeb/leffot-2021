import PropTypes from 'prop-types'
import Image from "next/legacy/image"
import { asText } from '@prismicio/helpers'

import { Info } from '@components/icons'
import styles from './GalleryImage.module.scss'

export default function GalleryImage({ index, setVariantGallery, variant }) {
    const {
        primary: { main_image: image, specs, plain_description },
    } = variant

    const hidden = plain_description || asText(specs)

    const onClick = event => {
        event.preventDefault()
        setVariantGallery(variant)
    }

    const gridArea = () => {
        if (index === 0) return 'bigImage'
        if (index === 5) return 'bigTuna'
        if (index === 10) return 'scarn'
        return `sub${index}`
    }

    return (
        <div className={styles.container} style={{ gridArea: gridArea() }}>
            <a
                href={image.url}
                onClick={onClick}
                onKeyPress={onClick}
                className={styles.overlay}
            >
                <span className='visuallyHidden'>View {hidden}</span>
            </a>
            <Image
                alt={image.alt || ''}
                height={image.dimensions.height}
                layout='responsive'
                objectFit='contain'
                objectPosition='center'
                src={image.url}
                width={image.dimensions.width}
            />
            <Info styles={styles.infoButton} />
        </div>
    )
}

GalleryImage.propTypes = {
    index: PropTypes.number,
    setVariantGallery: PropTypes.func,
    variant: PropTypes.object,
}

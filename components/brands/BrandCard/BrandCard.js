import PropTypes from 'prop-types'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { asText } from '@prismicio/helpers'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import styles from './BrandCard.module.scss'

function NoImage({ letter }) {
    return (
        <div className={styles.noImage}>
            <div className={styles.caption}>{letter}</div>
            <div className={styles.ratio} />
        </div>
    )
}

NoImage.propTypes = {
    letter: PropTypes.string,
}

export default function BrandCard({ caption, image, link, name, showButton }) {
    const brandName = asText(name)
    const ariaLabel = `Learn more about ${brandName}`

    return (
        <div className={styles.container}>
            <Link href={link} className={styles.voiceover}>
                <span className='visuallyHidden'>
                    {brandName} &mdash; <PrismicText field={caption} />
                </span>
            </Link>
            {image?.url ? (
                <Image
                    alt={image.alt}
                    src={image.url}
                    height={image.dimensions.height}
                    width={image.dimensions.width}
                />
            ) : (
                <NoImage letter={brandName.substring(0, 1)} />
            )}
            <h1 className={styles.title}>{brandName}</h1>
            <div className={styles.caption}>
                <PrismicRichText field={caption} />
            </div>
            {showButton && (
                <Link
                    href={link}
                    aria-label={ariaLabel}
                    className={styles.button}
                >
                    <span className='btn-text'>
                        Learn more
                        <span className='visuallyHidden'>
                            {' '}
                            about {brandName}
                        </span>
                    </span>
                </Link>
            )}
        </div>
    )
}

BrandCard.defaultProps = {
    showButton: true,
}

BrandCard.propTypes = {
    caption: PropTypes.array,
    image: PropTypes.object,
    link: PropTypes.string,
    name: PropTypes.array,
    showButton: PropTypes.bool,
}

import PropTypes from 'prop-types'
import Image from "next/legacy/image"

import edwardGreenImage from '@public/content/edward-green/shoe-trees/shoe-trees.jpg'
import gazianoImage from '@public/content/gaziano-and-girling/shoe-trees/shoe-trees.jpg'
import styles from './ShoeTreeImage.module.scss'

export default function ShoeTreeImage({ brandName }) {
    if (brandName === 'Edward Green' || brandName === 'Gaziano & Girling') {
        const altText = `${brandName} shoe trees`
        let imageUrl =
            brandName === 'Gaziano & Girling' ? gazianoImage : edwardGreenImage

        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>{brandName} Shoe Trees</h3>
                    <p className={styles.caption}>Made of aromatic lime wood</p>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        src={imageUrl}
                        alt={altText}
                    />
                </div>
            </div>
        )
    }

    return null
}

ShoeTreeImage.propTypes = {
    brandName: PropTypes.string,
}

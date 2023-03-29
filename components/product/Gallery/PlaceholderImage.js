import Image from "next/legacy/image"

import placeholderImage from '@public/ProductPlaceholder.gif'
import styles from './PlaceholderImage.module.scss'

export default function PlaceholderImage() {
    return (
        <>
            <link itemProp='image' href='/content/ProductPlaceholder.gif' />
            <figure>
                <div>
                    <Image
                        alt='Leffot logo'
                        className={styles.placeholder}
                        src={placeholderImage}
                    />
                </div>
            </figure>
        </>
    )
}

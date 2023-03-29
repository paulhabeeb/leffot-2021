import PropTypes from 'prop-types'
import Image from "next/legacy/image"

import { OverlayLoader } from '@components/placeholders'
import { useProductContext } from '@components/product'
import styles from './MainImage.module.scss'

export default function MainImage({ altText, urlOriginal }) {
    const { imageIsLoading, setImageIsLoading } = useProductContext()
    const imageLoaded = () => setImageIsLoading(false)

    return (
        <figure key={urlOriginal}>
            <div className={styles.container}>
                {imageIsLoading && (
                    <OverlayLoader loaderSize={26} style='transparent' />
                )}
                <Image
                    alt={altText}
                    height='2000'
                    objectFit='scale-down'
                    objectPosition='center'
                    onLoadingComplete={imageLoaded}
                    src={urlOriginal}
                    width='2000'
                />
            </div>
        </figure>
    )
}

MainImage.propTypes = {
    altText: PropTypes.string,
    urlOriginal: PropTypes.string,
}

import PropTypes from 'prop-types'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import prettyBytes from 'pretty-bytes'

import styles from './Details.module.scss'

export default function Details({ slice }) {
    return (
        <>
            {slice.items.map((field, index) => {
                const {
                    detail_caption: caption,
                    detail_file: file,
                    detail_heading: heading,
                } = field

                return (
                    <div className={styles.container} key={index}>
                        {heading && (
                            <h3>
                                <PrismicText field={heading} />
                            </h3>
                        )}
                        {caption && <PrismicRichText field={caption} />}
                        {file?.name && (
                            <p className={styles.paragraph}>
                                <svg
                                    className={styles.icon}
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 180 300'
                                >
                                    <polygon points='21 168 75 222 75 52 105 52 105 222 159 168 180 190 90 279 0 190 '></polygon>
                                </svg>
                                <a href={file.url}>{file.name}</a>
                                <span className={styles.fileSize}>
                                    ({prettyBytes(parseInt(file.size))})
                                </span>
                            </p>
                        )}
                    </div>
                )
            })}
        </>
    )
}

Details.propTypes = {
    slice: PropTypes.object,
}

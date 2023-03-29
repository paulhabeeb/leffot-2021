import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'

import { ErrorBoundary } from '@components/common'
import styles from './LocationHours.module.scss'

export default function LocationHours({ slice }) {
    return (
        <ErrorBoundary>
            <div>
                <h1 className={styles.title}>{asText(slice.primary.title1)}</h1>
                <div className={styles.body}>
                    {slice.items.map((field, index) => (
                        <div className={styles.column} key={index}>
                            <PrismicRichText field={field.body2} />
                        </div>
                    ))}
                </div>
            </div>
        </ErrorBoundary>
    )
}

LocationHours.propTypes = {
    slice: PropTypes.object,
}

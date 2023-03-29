import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import styles from './Drinks.module.scss'

export default function Drinks({ drinks }) {
    if (drinks.length > 0) {
        return (
            <div className={styles.container}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
                    <path d='M70.6 9.6c-8.5 0-15.4 6.5-16.2 14.7H13.1l29.1 39v20.9l-12.9 0.1 0 6 32.1-0.2 0-6 -13.2 0.1V63.8L65 41.2c1.8 0.7 3.7 1 5.6 1 9 0 16.3-7.3 16.3-16.3S79.6 9.6 70.6 9.6zM54.7 30.4h10.9L45.3 57.6 25 30.4H54.7zM70.6 36.2c-0.5 0-1 0-1.4-0.1l8.8-11.8h-0.4H60.4c0.8-4.9 5-8.7 10.2-8.7 5.7 0 10.3 4.6 10.3 10.3S76.3 36.2 70.6 36.2z' />
                </svg>
                <div className={styles.caption}>
                    <PrismicRichText field={drinks} />
                </div>
            </div>
        )
    }

    return null
}

Drinks.propTypes = {
    drinks: PropTypes.array,
}

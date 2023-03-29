import PropTypes from 'prop-types'
import Link from 'next/link'

import styles from './Caption.module.scss'

export default function Caption({ hasEvents }) {
    if (hasEvents) {
        return (
            <Link href='/events' className={styles.viewAll}>
                View all events
            </Link>
        )
    }

    return (
        <p className={styles.noEvents}>
            Sorry, no events are currently scheduled.
        </p>
    )
}

Caption.propTypes = {
    hasEvents: PropTypes.bool,
}

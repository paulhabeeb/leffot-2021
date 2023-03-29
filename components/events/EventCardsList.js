import PropTypes from 'prop-types'

import { EventCard } from '@components/common'
import styles from './EventCardsList.module.scss'

export default function EventCardsList({ events }) {
    if (events.length > 0) {
        return events.map((event, index) => (
            <li key={index}>
                <EventCard event={event} />
            </li>
        ))
    }

    return (
        <li>
            <p className={styles.noEvents}>
                Sorry, no events are currently scheduled.
            </p>
        </li>
    )
}

EventCardsList.propTypes = {
    events: PropTypes.array,
}

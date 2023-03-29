import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import styles from './Header.module.scss'

export default function EventHeader({ city, name, date }) {
    const eventTitle = `${asText(name)} — ${asText(city)}`

    // const crumbs = [
    //     {
    //         name: 'Home',
    //         url: '/',
    //     },
    //     {
    //         name: 'Events',
    //         url: '/events',
    //     },
    //     {
    //         name: eventTitle,
    //         url: null,
    //     },
    //     {
    //         name: '',
    //         url: null,
    //     },
    // ]

    return (
        <header className={styles.container}>
            <h1 className={styles.title}>{eventTitle}</h1>
            <h2 className={styles.date}>{asText(date)}</h2>
        </header>
    )
}

EventHeader.propTypes = {
    city: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
            spans: PropTypes.array,
        })
    ),
    name: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
            spans: PropTypes.array,
        })
    ),
    date: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
            spans: PropTypes.array,
        })
    ),
}

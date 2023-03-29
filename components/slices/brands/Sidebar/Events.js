import PropTypes from 'prop-types'
import Link from 'next/link'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import linkResolver from '@lib/link-resolver'

import styles from './Events.module.scss'

export default function Events({ events }) {
    if (events.length < 1) {
        return <p>No events currently scheduled.</p>
    }

    return (
        <>
            {events.map((event, index) => {
                const { city, date } = event.data
                const link = linkResolver(event)

                return (
                    <div className={styles.container} key={index}>
                        <h3>
                            <PrismicText field={city} />
                        </h3>
                        <PrismicRichText field={date} />
                        <Link href={link} className={styles.button}>
                            Find out more
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

Events.propTypes = {
    events: PropTypes.array,
}

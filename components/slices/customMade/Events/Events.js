import PropTypes from 'prop-types'

import { EventCard } from '@components/common'
import CardsWrapper from '../CardsWrapper'
import SectionHeader from '../SectionHeader'
import SectionWrapper from '../SectionWrapper'
import Caption from './Caption'
import NoEvents from './NoEvents'
import styles from './Events.module.scss'

export default function Events({ body, cards, title }) {
    const hasEvents = cards !== null
    const customStyles = cards === null ? styles.container : null

    return (
        <SectionWrapper customStyles={customStyles}>
            <SectionHeader body={body} title={title}>
                <Caption hasEvents={hasEvents} />
            </SectionHeader>
            {hasEvents ? (
                <CardsWrapper>
                    {cards.map((event, index) => (
                        <li key={index}>
                            <EventCard event={event} />
                        </li>
                    ))}
                </CardsWrapper>
            ) : (
                <NoEvents />
            )}
        </SectionWrapper>
    )
}

Events.propTypes = {
    body: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
    cards: PropTypes.array,
    title: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
}

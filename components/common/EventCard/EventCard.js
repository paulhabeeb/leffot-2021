import PropTypes from 'prop-types'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { asText } from '@prismicio/helpers'
import linkResolver from '@lib/link-resolver'

import styles from './EventCard.module.scss'

export default function EventCard({ event }) {
    const { caption, city, date, image, name } = event.data
    const link = linkResolver(event)
    const buttonHiddenLabel = ` about the event with ${asText(
        name
    )} on ${asText(date)}`

    return (
        <div className={styles.eventCard}>
            <Link href={link} className={styles.voiceover}>
                <span className='visuallyHidden'>
                    {asText(name)} &mdash; {asText(date)} in {asText(city)}
                </span>
            </Link>
            <div className={styles.tag}>{asText(city)}</div>
            <div className={styles.imageContainer}>
                <Image
                    alt={image.alt}
                    className={styles.image}
                    height={image.eventCard.dimensions.height}
                    src={image.eventCard.url}
                    width={image.eventCard.dimensions.width}
                />
            </div>
            <div className={styles.details}>
                {name && <h1 className={styles.title}>{asText(name)}</h1>}
                <p className={styles.date}>{asText(date)}</p>
                <p>{asText(caption)}</p>
                <Link href={link} className={styles.button}>
                    Learn more
                    <span className='visuallyHidden'>{buttonHiddenLabel}</span>
                </Link>
            </div>
        </div>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        data: PropTypes.shape({
            caption: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                })
            ),
            city: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                })
            ),
            date: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                })
            ),
            image: PropTypes.object,
            name: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                })
            ),
        }),
    }),
}

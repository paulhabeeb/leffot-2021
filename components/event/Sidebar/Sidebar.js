import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'
import { email } from '@lib/data'

import SidebarDetail from './SidebarDetail'
import styles from './Sidebar.module.scss'

export default function EventSidebar({
    addressPhone,
    appointments,
    date,
    rep,
    time,
}) {
    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.title}>Details</h1>
            <div className={styles.details}>
                <SidebarDetail title='Representative' caption={asText(rep)} />
                <SidebarDetail
                    title='Date and time'
                    caption={<PrismicRichText field={date} />}
                    captionTwo={<PrismicRichText field={time} />}
                />
                <SidebarDetail
                    title='Location'
                    caption={<PrismicRichText field={addressPhone} />}
                />
                <SidebarDetail
                    title='Appointments'
                    caption={<PrismicRichText field={appointments} />}
                >
                    <p>
                        <a
                            className={styles.button}
                            href={`mailto:${email.events}`}
                        >
                            Book an appointment
                        </a>
                    </p>
                </SidebarDetail>
            </div>
        </aside>
    )
}

EventSidebar.propTypes = {
    addressPhone: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
            spans: PropTypes.array,
        })
    ),
    appointments: PropTypes.arrayOf(
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
    rep: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
            spans: PropTypes.array,
        })
    ),
    time: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            text: PropTypes.string,
            spans: PropTypes.array,
        })
    ),
}

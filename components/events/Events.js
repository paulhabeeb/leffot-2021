import { useState } from 'react'
import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import { ErrorBoundary, LinkedCallout, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import { MailingListModal } from '@components/modals'
import EventCardsList from './EventCardsList'
import styles from './Events.module.scss'

export default function Events({
    callout,
    eventPage,
    events,
    footer,
    header,
    siteBanner,
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const toggleModal = () => setModalIsOpen(!modalIsOpen)

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                canonical={eventPage.canonical_url}
                description={eventPage.meta_description}
                title={eventPage.meta_title}
                openGraph={{
                    title: eventPage.meta_title,
                    url: eventPage.canonical_url,
                }}
            />
            <ErrorBoundary>
                <PageHeader
                    backgroundImage={
                        eventPage.main_image && eventPage.main_image.small.url
                    }
                    title={<PrismicText field={eventPage.title} />}
                />
            </ErrorBoundary>
            <main id='main' className={styles.container}>
                <ErrorBoundary>
                    <div className={styles.caption}>
                        <PrismicRichText field={eventPage.header_caption} />
                    </div>
                    <ul className={styles.eventList}>
                        <EventCardsList events={events} />
                        <LinkedCallout
                            {...callout}
                            isOneCol={true}
                            toggleModal={toggleModal}
                        />
                    </ul>
                </ErrorBoundary>
            </main>
            <MailingListModal isOpen={modalIsOpen} toggleModal={toggleModal} />
        </Base>
    )
}

Events.propTypes = {
    callout: PropTypes.object,
    eventPage: PropTypes.object,
    events: PropTypes.array,
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

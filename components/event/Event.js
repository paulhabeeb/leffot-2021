import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { urls } from '@lib/data'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import { ErrorBoundary, MasonryGallery } from '@components/common'
import { Base } from '@components/layout'
import Drinks from './Drinks'
import EventHeader from './Header'
import Sidebar from './Sidebar'
import styles from './Event.module.scss'

export default function Event({ footer, gallery, header, page, siteBanner }) {
    const {
        addressphone,
        appointments,
        city,
        date,
        drinks,
        image,
        long_description,
        meta_title,
        meta_description,
        name,
        rep,
        slug,
        time,
    } = page.data
    const canonical = `${urls.baseUrl}${slug}`
    const ogImages = image?.eventCard?.url
        ? [
              {
                  alt: image.eventCard.alt,
                  height: image.eventCard.dimensions.height,
                  url: image.eventCard.url,
                  width: image.eventCard.dimensions.width,
              },
          ]
        : []

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                canonical={canonical}
                description={meta_description}
                title={meta_title}
                openGraph={{
                    images: ogImages,
                    title: meta_title,
                    url: canonical,
                }}
            />
            <main id='main' className={styles.container}>
                <article className={styles.article}>
                    <div className={styles.main}>
                        <ErrorBoundary>
                            <EventHeader name={name} city={city} date={date} />
                        </ErrorBoundary>
                        <section className={styles.description}>
                            <PrismicRichText field={long_description} />
                            <ErrorBoundary>
                                <Drinks drinks={drinks} />
                            </ErrorBoundary>
                        </section>
                    </div>
                    <ErrorBoundary>
                        <Sidebar
                            rep={rep}
                            date={date}
                            time={time}
                            addressPhone={addressphone}
                            appointments={appointments}
                        />
                    </ErrorBoundary>
                </article>
                {gallery && (
                    <section className={styles.gallery}>
                        <div className={styles.galleryHeader}>
                            <h2 className={styles.galleryHeaderTitle}>
                                <PrismicText field={name} /> Gallery
                            </h2>
                            <p className={styles.galleryHeaderCaption}>
                                Find inspiration for your next{' '}
                                <PrismicText field={name} /> order.
                            </p>
                        </div>
                        <MasonryGallery images={gallery} />
                    </section>
                )}
            </main>
        </Base>
    )
}

Event.propTypes = {
    footer: PropTypes.object,
    gallery: PropTypes.array,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

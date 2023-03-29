import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'
import { predicate } from '@prismicio/client'
import { PrismicText, PrismicRichText } from '@prismicio/react'
import { queryAllOfType, queryByUID } from '@lib/queries/prismic'
import todaysDate from '@lib/now'
import getPageLayoutData from '@lib/queries/layout-props'

import { ErrorBoundary, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import { SliceFactory } from '@components/slices/customMade'

export default function CustomMadePage({
    brands,
    events,
    footer,
    header,
    page,
    siteBanner,
}) {
    const {
        body,
        body1: slices,
        canonical_url,
        main_image,
        meta_description,
        meta_title,
        title,
    } = page.data

    const ogImages = main_image?.small?.url
        ? [
              {
                  height: main_image.small.dimensions.height,
                  url: main_image.small.url,
                  width: main_image.small.dimensions.width,
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
                canonical={canonical_url}
                description={meta_description}
                title={meta_title}
                openGraph={{
                    images: ogImages,
                    title: meta_title,
                }}
            />
            <ErrorBoundary>
                <PageHeader
                    title={<PrismicText field={title} />}
                    caption={<PrismicRichText field={body} />}
                    backgroundImage={main_image?.small?.url}
                />
            </ErrorBoundary>
            <main id='main'>
                {slices.map((slice, index) => (
                    <SliceFactory
                        brands={brands}
                        events={events}
                        slice={slice}
                        key={index}
                    />
                ))}
            </main>
        </Base>
    )
}

CustomMadePage.propTypes = {
    brands: PropTypes.array,
    events: PropTypes.array,
    footer: PropTypes.object,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

export async function getStaticProps() {
    try {
        const now = todaysDate()
        const [header, footer, siteBanner] = await getPageLayoutData()
        const [page, brands, events] = await Promise.all([
            queryByUID('custom-made', 'page'),
            queryAllOfType('custom_made_brand', {
                orderings: {
                    field: 'my.custom_made_brand.uid',
                    direction: 'asc',
                },
                predicates: [
                    predicate.at('my.custom_made_brand.enabled', true),
                ],
            }),
            queryAllOfType('event', {
                orderings: {
                    field: 'my.event.date',
                    direction: 'asc',
                },
                pageSize: 4,
                predicates: [predicate.dateAfter('my.event.expiry', now)],
            }),
        ])

        return {
            props: {
                brands,
                events,
                footer,
                header,
                page,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

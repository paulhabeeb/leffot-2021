import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo } from 'next-seo'

import { queryAllOfType, queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'
import { asText } from '@prismicio/helpers'

import { ErrorBoundary, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import { SliceFactory } from '@components/slices/pages'

export default function PrismicPage({ footer, header, page, siteBanner }) {
    const {
        body1,
        canonical_url,
        main_image,
        meta_description,
        meta_title,
        title,
    } = page.data

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
                    title: meta_title,
                }}
            />
            <ErrorBoundary>
                <PageHeader
                    backgroundImage={main_image?.small?.url}
                    title={asText(title)}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <SliceFactory slices={body1} />
            </ErrorBoundary>
        </Base>
    )
}

PrismicPage.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

export async function getStaticProps({ params }) {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()
        const page = await queryByUID(params.uid, 'page')

        return {
            props: {
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

export async function getStaticPaths() {
    const docs = await queryAllOfType('page')

    const paths = []
    docs.forEach(doc => {
        // Ignore the sizing page for now, once we delete it we can remove this
        // and switch to a simple map instead of forEach.
        //
        // Also have to ingore the custom made page, which we need to move to
        // its own singleton type at some point.
        //
        // Same thing for the Journal homepage. It's a page type now, needs to be its
        // own or something else, maybe. Or could always just keep the exception
        // here, if you want? Nah.
        //
        // And for the brands overview page, too. Needs its own type.
        if (
            doc.uid !== 'sizing' &&
            doc.uid !== 'custom-made' &&
            doc.uid !== 'journal' &&
            doc.uid !== 'brands' &&
            doc.uid !== 'categories'
        ) {
            paths.push({ params: { uid: doc.uid } })
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

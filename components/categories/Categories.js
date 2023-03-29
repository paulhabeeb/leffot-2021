import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import { ErrorBoundary, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import CategoriesGrid from './CategoriesGrid'
import styles from './Categories.module.scss'

export default function Categories({
    categories,
    footer,
    header,
    page,
    siteBanner,
}) {
    const {
        body,
        canonical_url,
        main_image,
        meta_title,
        meta_description,
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
                    caption={<PrismicRichText field={body} />}
                    title={<PrismicText field={title} />}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <main className={styles.container} id='main'>
                    <CategoriesGrid categories={categories} />
                </main>
            </ErrorBoundary>
        </Base>
    )
}

Categories.propTypes = {
    categories: PropTypes.array,
    footer: PropTypes.object,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

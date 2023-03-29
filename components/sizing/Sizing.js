import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { asText } from '@prismicio/helpers'

import { ErrorBoundary, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import SizeGuide from './SizeGuide'
import styles from './Sizing.module.scss'

export default function Sizing({ footer, header, page, siteBanner }) {
    const {
        body,
        canonical_url,
        conversions,
        header_caption,
        main_image,
        meta_description,
        meta_title,
        sizes,
        title,
        widths,
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
                    url: canonical_url,
                }}
            />
            <ErrorBoundary>
                <PageHeader
                    backgroundImage={main_image?.small?.url}
                    caption={asText(header_caption)}
                    title={asText(title)}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <main className={styles.container} id='main'>
                    <SizeGuide
                        conversions={JSON.parse(asText(conversions))}
                        sizes={JSON.parse(asText(sizes))}
                        steps={body}
                        widths={JSON.parse(asText(widths))}
                    />
                </main>
            </ErrorBoundary>
        </Base>
    )
}

Sizing.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

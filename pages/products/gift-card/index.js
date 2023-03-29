import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { NextSeo, ProductJsonLd } from 'next-seo'
import { giftCard } from '@lib/data'
import getPageLayoutData from '@lib/queries/layout-props'

import { Base } from '@components/layout'
import { GiftCard } from '@components/product'

export default function GiftCardPage({ footer, header, siteBanner }) {
    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                title={giftCard.product.seo.pageTitle}
                description={giftCard.product.seo.metaDescription}
                canonical={giftCard.product.seo.canonical}
                openGraph={{
                    title: giftCard.product.name,
                    description: giftCard.product.seo.metaDescription,
                    url: giftCard.product.seo.canonical,
                    images: [
                        {
                            url: giftCard.product.images[0].urlOriginal,
                            alt: giftCard.product.name,
                        },
                    ],
                }}
            />
            <ProductJsonLd
                productName={giftCard.product.name}
                images={[giftCard.product.images[0].urlOriginal]}
                description={giftCard.product.seo.metaDescription}
                brand={giftCard.product.brand.name}
            />
            <GiftCard />
        </Base>
    )
}

GiftCardPage.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

export async function getStaticProps() {
    try {
        const [header, footer, siteBanner] = await getPageLayoutData()

        return {
            props: {
                footer,
                header,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

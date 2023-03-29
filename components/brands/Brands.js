import { useState } from 'react'
import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import { ErrorBoundary, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import BrandsGrid from './BrandsGrid'
import Filters from './Filters'
import styles from './Brands.module.scss'

const filters = [
    {
        title: 'Product type',
        id: 'type',
        initialValue: 'All',
        type: 'radio',
        values: [
            {
                label: 'All',
                id: 'type-all',
            },
            {
                label: 'Shoes',
                id: 'type-shoes',
            },
            {
                label: 'Shoe care',
                id: 'type-shoe-care',
            },
            {
                label: 'Accessories',
                id: 'type-accessories',
            },
        ],
    },
    {
        title: 'Offerings',
        id: 'offerings',
        initialValue: 'All',
        type: 'radio',
        values: [
            {
                label: 'All',
                id: 'offerings-all',
            },
            {
                label: 'Ready-to-wear',
                id: 'offerings-ready-to-wear',
            },
            {
                label: 'Custom made',
                id: 'offerings-custom-made',
            },
        ],
    },
]

export default function Brands({ brands, footer, header, page, siteBanner }) {
    const [type, setType] = useState(filters[0].initialValue)
    const [offerings, setOfferings] = useState(filters[1].initialValue)

    const {
        body,
        canonical_url,
        main_image,
        meta_title,
        meta_description,
        title,
    } = page.data

    const handleChange = (key, value) => {
        if (key === 'type') {
            setType(value)
        }
        if (key === 'offerings') {
            setOfferings(value)
        }
    }

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
                    <Filters
                        filters={filters}
                        handleChange={handleChange}
                        offerings={offerings}
                        type={type}
                    />
                    <BrandsGrid
                        brands={brands}
                        selectedOfferings={offerings}
                        selectedType={type}
                    />
                </main>
            </ErrorBoundary>
        </Base>
    )
}

Brands.propTypes = {
    brands: PropTypes.array,
    footer: PropTypes.object,
    header: PropTypes.object,
    page: PropTypes.object,
    siteBanner: PropTypes.object,
}

import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'

import { Banner } from '@components/common'
import { CustomMade } from '@components/brands'
import { Base } from '@components/layout'
import Body from './Body'
import HeaderFactory from './Header'

export default function Category({
    banner,
    categoryBrand,
    categoryBrandEvents,
    categoryHeader,
    categoryProducts,
    categoryType,
    footer,
    gallery,
    header,
    powBrandName,
    siteBanner,
    subcategories,
}) {
    let ogImages = []

    if (categoryHeader?.banner_image?.url) {
        ogImages = [
            {
                alt: categoryHeader.banner_image.alt,
                height: categoryHeader.banner_image.dimensions.height,
                url: categoryHeader.banner_image.url,
                width: categoryHeader.banner_image.dimensions.width,
            },
        ]
    }
    if (categoryHeader?.banner_image?.medium?.url) {
        ogImages = [
            {
                alt: categoryHeader.banner_image.medium.alt,
                height: categoryHeader.banner_image.medium.dimensions.height,
                url: categoryHeader.banner_image.medium.url,
                width: categoryHeader.banner_image.medium.dimensions.width,
            },
        ]
    }

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                title={categoryHeader.meta_title}
                description={categoryHeader.meta_description}
                canonical={categoryHeader.canonical_url}
                openGraph={{
                    title: categoryHeader.meta_title,
                    url: categoryHeader.canonical_url,
                    images: ogImages,
                }}
            />
            <Banner banner={banner} type='category_banner' />
            <HeaderFactory
                brandTabs={categoryBrand?.tab}
                categoryHeader={categoryHeader}
                categoryType={categoryType}
                highlight={powBrandName}
                showBrandTabs={categoryBrand?.show_brand_tabs}
                subcategories={subcategories}
            />
            {categoryType === 'custom_made_brand' &&
            !categoryHeader?.show_category_products ? (
                <CustomMade
                    brand={categoryBrand}
                    customMade={categoryHeader}
                    events={categoryBrandEvents}
                    gallery={gallery}
                />
            ) : (
                <Body
                    filters={
                        categoryHeader?.product_filters ||
                        categoryBrand?.product_filters
                    }
                    products={categoryProducts}
                />
            )}
        </Base>
    )
}

Category.propTypes = {
    banner: PropTypes.object,
    categoryBrand: PropTypes.object,
    categoryBrandEvents: PropTypes.array,
    categoryHeader: PropTypes.object,
    categoryProducts: PropTypes.array,
    categoryType: PropTypes.string,
    footer: PropTypes.object,
    gallery: PropTypes.array,
    header: PropTypes.object,
    powBrandName: PropTypes.string,
    siteBanner: PropTypes.object,
    subcategories: PropTypes.array,
}

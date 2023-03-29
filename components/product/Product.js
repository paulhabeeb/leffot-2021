import PropTypes from 'prop-types'
import { NextSeo, ProductJsonLd } from 'next-seo'
import { urls } from '@lib/data'
import { ProductContextProvider } from './Context'

import { Breadcrumbs, ErrorBoundary } from '@components/common'
import AddToCart from './AddToCart'
import ArchiveGallery from './ArchiveGallery'
import DetailsList from './DetailsList'
import Gallery from './Gallery'
import ProductHeader from './ProductHeader'
import RelatedProducts from './RelatedProducts'
import Wrapper from './Wrapper'

const getAvailabilityAndCondition = product => {
    let availability = 'InStock'
    if (product.availabilityV2.status === 'Preorder') {
        availability = 'PreOrder'
    }
    if (product.availabilityV2.status === 'Unavailable') {
        availability = 'SoldOut'
    }

    let itemCondition = null
    if (product.isPreowned) {
        itemCondition =
            product.fields.pow_condition.value !== 'New'
                ? 'UsedCondition'
                : 'NewCondition'
    }

    return {
        availability,
        itemCondition,
    }
}

export default function Product({
    archiveGallery,
    checkboxToggles,
    initCheckboxToggleState,
    initialValues,
    product,
    sizeChart,
}) {
    const url = `${urls.baseUrl}${product.path}`
    const { availability, itemCondition } = getAvailabilityAndCondition(product)
    const initContext = {
        availableOptions: product.productOptions,
        defaultImage: product.defaultImage,
        prices: product.prices,
    }
    const metaDescription = product.seo.metaDescription || product.description

    return (
        <ProductContextProvider init={initContext}>
            <NextSeo
                title={product.seo.pageTitle.replace(' - Leffot', '')}
                description={metaDescription}
                canonical={url}
                openGraph={{
                    title: product.name,
                    description: metaDescription,
                    url,
                    images: [
                        {
                            url: product.images[0].urlOriginal,
                            alt: product.name,
                        },
                    ],
                }}
            />
            <ProductJsonLd
                productName={product.name}
                images={[product.images[0].urlOriginal]}
                description={metaDescription}
                brand={product.brand.name}
                offers={{
                    price: product.prices.price.value,
                    priceCurrency: product.prices.price.currencyCode,
                    itemCondition,
                    availability: `https://schema.org/${availability}`,
                    url,
                }}
            />
            <Wrapper
                details={
                    <>
                        <Breadcrumbs
                            categories={product.categories}
                            path={product.path}
                        />
                        <ProductHeader product={product} />
                        <ErrorBoundary>
                            {product.isArchiveColl && (
                                <DetailsList
                                    {...product}
                                    sizeChart={sizeChart}
                                />
                            )}
                        </ErrorBoundary>
                        <AddToCart
                            checkboxToggles={checkboxToggles}
                            initCheckboxToggleState={initCheckboxToggleState}
                            initialValues={initialValues}
                            product={product}
                            key={url}
                        />
                        <ErrorBoundary>
                            {!product.isArchiveColl && (
                                <DetailsList
                                    {...product}
                                    sizeChart={sizeChart}
                                />
                            )}
                        </ErrorBoundary>
                    </>
                }
                gallery={<Gallery images={product.images} />}
                product={product}
            />
            {product.isArchiveColl && archiveGallery && (
                <ArchiveGallery archiveGallery={archiveGallery} />
            )}
            <RelatedProducts products={product.relatedProducts} />
        </ProductContextProvider>
    )
}

Product.propTypes = {
    archiveGallery: PropTypes.array,
    checkboxToggles: PropTypes.array,
    initCheckboxToggleState: PropTypes.object,
    initialValues: PropTypes.object,
    product: PropTypes.object,
    sizeChart: PropTypes.object,
}

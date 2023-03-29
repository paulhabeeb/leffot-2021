import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import { PageHeader } from '@components/common'

const BrandTabs = dynamic(() => import('./BrandTabs'))
const Subcategories = dynamic(() => import('./Subcategories'))

export default function CategoryHeader({
    banner_image,
    caption,
    name,
    highlight,
    show_brand_tabs,
    subcategories,
    tab,
}) {
    let backgroundImage = null
    if (banner_image?.url) {
        backgroundImage = banner_image.url
    }
    if (banner_image?.large?.url) {
        backgroundImage = banner_image.large.url
    }

    return (
        <>
            <PageHeader
                backgroundImage={backgroundImage}
                highlight={highlight}
                caption={caption && <PrismicRichText field={caption} />}
                title={<PrismicText field={name} />}
            />
            {subcategories && <Subcategories subcategories={subcategories} />}
            {show_brand_tabs && <BrandTabs brandName={name} tabs={tab} />}
        </>
    )
}

CategoryHeader.propTypes = {
    banner_image: PropTypes.object,
    caption: PropTypes.array,
    highlight: PropTypes.string,
    name: PropTypes.array,
    show_brand_tabs: PropTypes.bool,
    subcategories: PropTypes.array,
    tab: PropTypes.array,
}

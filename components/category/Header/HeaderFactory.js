import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'

const CategoryHeader = dynamic(() => import('./CategoryHeader'))
const JumboBleedThruHeader = dynamic(() => import('./JumboBleedThruHeader'))

export default function HeaderFactory({
    brandTabs,
    categoryHeader,
    categoryType,
    highlight,
    showBrandTabs,
    subcategories,
}) {
    // Regular categories, the pre-owned section, brand categories all get a
    // regular header.
    if (categoryType !== 'custom_made_brand') {
        return (
            <CategoryHeader
                {...categoryHeader}
                highlight={highlight}
                subcategories={subcategories}
            />
        )
    }

    return categoryHeader.body1.map((header, index) => {
        const { background_color, description, image, tagline, title } =
            header.primary

        if (header.slice_type === 'jumbo_header__bleed-thru_') {
            return (
                <JumboBleedThruHeader
                    background_color={background_color}
                    banner_image={image}
                    caption={description}
                    name={title}
                    show_brand_tabs={showBrandTabs}
                    tab={brandTabs}
                    tagline={tagline}
                    key={index}
                />
            )
        }

        if (header.slice_type === 'category_banner') {
            return (
                <CategoryHeader
                    banner_image={image}
                    caption={description}
                    highlight={highlight}
                    name={title}
                    show_brand_tabs={showBrandTabs}
                    tab={brandTabs}
                    key={index}
                />
            )
        }

        return null
    })
}

HeaderFactory.propTypes = {
    brandTabs: PropTypes.array,
    categoryHeader: PropTypes.object,
    categoryType: PropTypes.string,
    highlight: PropTypes.string,
    showBrandTabs: PropTypes.bool,
    subcategories: PropTypes.array,
}

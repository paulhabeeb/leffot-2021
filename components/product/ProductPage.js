import PropTypes from 'prop-types'

import { Base } from '@components/layout'
import Product from './Product'

export default function ProductPage({
    archiveGallery,
    checkboxToggles,
    footer,
    header,
    initCheckboxToggleState,
    initialValues,
    product,
    siteBanner,
    sizeChart,
}) {
    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <Product
                archiveGallery={archiveGallery}
                checkboxToggles={checkboxToggles}
                initCheckboxToggleState={initCheckboxToggleState}
                initialValues={initialValues}
                product={product}
                sizeChart={sizeChart}
            />
        </Base>
    )
}

ProductPage.propTypes = {
    archiveGallery: PropTypes.array,
    checkboxToggles: PropTypes.array,
    footer: PropTypes.object,
    header: PropTypes.object,
    initCheckboxToggleState: PropTypes.object,
    initialValues: PropTypes.object,
    product: PropTypes.object,
    siteBanner: PropTypes.object,
    sizeChart: PropTypes.object,
}

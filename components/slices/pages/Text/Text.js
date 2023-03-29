import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import { ErrorBoundary } from '@components/common'

export default function Text({ slice }) {
    return (
        <ErrorBoundary>
            <PrismicRichText field={slice.primary.text_body} />
        </ErrorBoundary>
    )
}

Text.propTypes = {
    slice: PropTypes.object,
}

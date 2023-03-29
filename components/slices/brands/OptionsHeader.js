import PropTypes from 'prop-types'
import { PrismicRichText, PrismicText } from '@prismicio/react'

import OptionsWrapper from './OptionsWrapper'

export default function OptionsHeader({ slice }) {
    const { header_caption, header_title } = slice.primary

    return (
        <OptionsWrapper>
            <h2>
                <PrismicText field={header_title} />
            </h2>
            <PrismicRichText field={header_caption} />
        </OptionsWrapper>
    )
}

OptionsHeader.propTypes = {
    slice: PropTypes.object,
}

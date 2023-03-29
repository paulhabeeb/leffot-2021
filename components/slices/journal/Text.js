import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

export default function Text({ text }) {
    return <PrismicRichText field={text} />
}

Text.propTypes = {
    text: PropTypes.array,
}

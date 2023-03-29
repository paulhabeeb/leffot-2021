import PropTypes from 'prop-types'

export default function ConvertedWidth({ brand, width }) {
    if (brand === 'Corthay') return null

    return <span>{width}</span>
}

ConvertedWidth.propTypes = {
    brand: PropTypes.string,
    width: PropTypes.string,
}

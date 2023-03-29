import PropTypes from 'prop-types'

export default function ConvertedSize({ brand, selectedSize, offset }) {
    if (brand === 'Edward Green') {
        return (
            <span>
                {selectedSize - offset} / {selectedSize}
            </span>
        )
    }

    // Hiro slippers and Drake's shoes are only in whole sizes, and we round them down
    if (
        brand === 'Hiro Yanagimachi' ||
        brand === 'Drake’s' ||
        brand === "Drake's"
    ) {
        return <span>{Math.floor(selectedSize)}</span>
    }

    return <span>{selectedSize - offset}</span>
}

ConvertedSize.propTypes = {
    brand: PropTypes.string,
    selectedSize: PropTypes.string,
    offset: PropTypes.number,
}

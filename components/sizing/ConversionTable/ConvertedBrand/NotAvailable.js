import PropTypes from 'prop-types'

export default function NotAvailable({ brand, last }) {
    if (brand === 'Alden') {
        return (
            <div>
                <p>The {last} last is not available in this width.</p>
            </div>
        )
    }

    if (brand === 'Saint Crispin’s') {
        return (
            <div>
                <p>
                    This width is not available from {brand}, but bespoke
                    options are available. Contact us for more information.
                </p>
            </div>
        )
    }

    return (
        <div>
            <p>This width is not available from {brand}.</p>
        </div>
    )
}

NotAvailable.propTypes = {
    brand: PropTypes.string,
    last: PropTypes.string,
}

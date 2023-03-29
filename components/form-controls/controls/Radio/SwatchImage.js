import PropTypes from 'prop-types'

export default function SwatchImage({ label, url }) {
    return (
        <div>
            <div>
                <img src={url} alt={label} />
            </div>
        </div>
    )
}

SwatchImage.propTypes = {
    label: PropTypes.string,
    url: PropTypes.string,
}

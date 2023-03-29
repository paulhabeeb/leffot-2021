import PropTypes from 'prop-types'

export default function List({ styles }) {
    return (
        <svg
            className={styles}
            xmlns='http://www.w3.org/2000/svg'
            width='100'
            height='100'
            viewBox='0 0 100 100'
        >
            <rect x='36' y='64' width='43' height='5' />
            <rect x='20' y='64' width='9' height='5' />
            <rect x='36' y='47' width='43' height='5' />
            <rect x='20' y='47' width='9' height='5' />
            <rect x='36' y='30' width='43' height='5' />
            <rect x='20' y='30' width='9' height='5' />
        </svg>
    )
}

List.propTypes = {
    styles: PropTypes.string,
}

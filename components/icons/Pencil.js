import PropTypes from 'prop-types'

export default function Pencil({ styles }) {
    return (
        <svg
            className={styles}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 14 14'
        >
            <path d='M12.7 4.3L9.5 1.3 10.8 0 14 3.1 12.7 4.3zM4 12.9L1 10l7.5-7.7 3.3 2.9L4 12.9zM0 14V11l3 3H0z' />
        </svg>
    )
}

Pencil.propTypes = {
    styles: PropTypes.string,
}

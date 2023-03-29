import PropTypes from 'prop-types'

export default function ChevronDown({ className }) {
    return (
        <svg
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
        >
            <path d='M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' />
        </svg>
    )
}

ChevronDown.propTypes = {
    className: PropTypes.string,
}

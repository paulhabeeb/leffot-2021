import PropTypes from 'prop-types'

export default function ChevronDown({ styles }) {
    return (
        <svg
            className={styles}
            width='12'
            height='8'
            viewBox='0 0 12 8'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M6 6.174l5.313-4.96.23-.214.457.427-.23.214-5.51 5.146L6.03 7 6 6.972 5.97 7l-.23-.214L.23 1.64 0 1.428.458 1l.23.214L6 6.174z'
                strokeLinecap='square'
                fillRule='evenodd'
            />
        </svg>
    )
}

ChevronDown.propTypes = {
    styles: PropTypes.string,
}

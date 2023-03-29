import PropTypes from 'prop-types'

export default function ChevronUp({ className, styles }) {
    return (
        <svg
            css={styles}
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
        >
            <path d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z' />
        </svg>
    )
}

ChevronUp.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
}

import PropTypes from 'prop-types'

export default function Search({ styles, tabIndex }) {
    return (
        <svg
            className={styles}
            tabIndex={tabIndex}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
        >
            <path
                className='magnifier'
                d='M96.2 88.9l-24-24c4.9-6.4 7.7-14.3 7.7-23 0-21-17.1-38.1-38.1-38.1S3.8 20.9 3.8 41.9s17.1 38.1 38.1 38.1c8.7 0 16.5-2.9 23-7.7l24 24L96.2 88.9zM14.3 41.9c0-15.2 12.3-27.6 27.6-27.6s27.6 12.3 27.6 27.6S57.1 69.4 41.9 69.4 14.3 57.1 14.3 41.9z'
            ></path>
        </svg>
    )
}

Search.propTypes = {
    styles: PropTypes.string,
    tabIndex: PropTypes.string,
}

Search.defaultProps = {
    tabIndex: '0',
}

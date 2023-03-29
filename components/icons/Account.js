import PropTypes from 'prop-types'

export default function Account({ styles }) {
    return (
        <svg
            className={styles}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
        >
            <path
                className='head'
                d='M50 52.3c-12.7 0-22.9-10.2-22.9-22.9S37.3 6.5 50 6.5s22.9 10.2 22.9 22.9S62.7 52.3 50 52.3zM50 14.2c-8.4 0-15.2 6.8-15.2 15.2S41.6 44.6 50 44.6s15.2-6.8 15.2-15.2S58.4 14.2 50 14.2z'
            />
            <path
                className='body'
                d='M89.3 93.5h-7.7c0-17.4-14.2-31.6-31.6-31.6S18.4 76.1 18.4 93.5h-7.7c0-21.6 17.7-39.3 39.3-39.3S89.3 71.9 89.3 93.5z'
            />
        </svg>
    )
}

Account.propTypes = {
    styles: PropTypes.string,
}

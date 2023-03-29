import PropTypes from 'prop-types'

export default function Cart({ styles }) {
    return (
        <svg
            className={styles}
            xmlns='http://www.w3.org/2000/svg'
            data-name='Layer 1'
            viewBox='0 0 100 100'
        >
            <title>Cart</title>
            <path
                className='wheel-right'
                d='M86.1 78.6A11.5 11.5 0 1 0 74.6 90.1 11.5 11.5 0 0 0 86.1 78.6Zm-14.9 0a3.5 3.5 0 1 1 3.5 3.5A3.5 3.5 0 0 1 71.2 78.6Z'
            ></path>
            <polygon
                className='cart'
                points='28.3 64.1 84.6 64.1 94.4 24.4 53.6 24.4 53.6 32.4 84.2 32.4 78.4 56.1 34.6 56.1 23.6 9.9 5.6 9.9 5.6 17.9 17.3 17.9 28.3 64.1'
            ></polygon>
            <path
                className='wheel-left'
                d='M47.3 78.6A11.5 11.5 0 1 0 35.8 90.1 11.5 11.5 0 0 0 47.3 78.6Zm-14.9 0a3.5 3.5 0 1 1 3.5 3.5A3.5 3.5 0 0 1 32.4 78.6Z'
            ></path>
        </svg>
    )
}

Cart.propTypes = {
    styles: PropTypes.string,
}

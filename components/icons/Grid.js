import PropTypes from 'prop-types'

export default function Grid({ styles }) {
    return (
        <svg
            className={styles}
            xmlns='http://www.w3.org/2000/svg'
            width='100'
            height='100'
            viewBox='0 0 100 100'
        >
            <path d='M20,20H45v4H20V20Zm21,4h4V41H41V24ZM20,41H45v4H20V41Zm0-17h4V41H20V24Z' />
            <path d='M54,20H79v4H54V20Zm21,4h4V41H75V24ZM54,41H79v4H54V41Zm0-17h4V41H54V24Z' />
            <path d='M54,54H79v4H54V54Zm21,4h4V75H75V58ZM54,75H79v4H54V75Zm0-17h4V75H54V58Z' />
            <path d='M20,54H45v4H20V54Zm21,4h4V75H41V58ZM20,75H45v4H20V75Zm0-17h4V75H20V58Z' />
        </svg>
    )
}

Grid.propTypes = {
    styles: PropTypes.string,
}

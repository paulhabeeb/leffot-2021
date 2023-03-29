import PropTypes from 'prop-types'

export default function RawHTML({ className, code }) {
    const html = { __html: code }

    return <div className={className} dangerouslySetInnerHTML={html} />
}

RawHTML.propTypes = {
    className: PropTypes.string,
    code: PropTypes.string,
}

import PropTypes from 'prop-types'

export default function PromoArticle({ children, styles }) {
    return <div style={styles}>{children}</div>
}

PromoArticle.propTypes = {
    children: PropTypes.node.isRequired,
    styles: PropTypes.object,
}

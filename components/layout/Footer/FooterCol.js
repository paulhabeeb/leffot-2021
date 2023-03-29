import PropTypes from 'prop-types'
import styles from './Footer.module.scss'

export default function FooterCol({ children }) {
    return <div className={styles.footerCol}>{children}</div>
}

FooterCol.propTypes = {
    children: PropTypes.node,
}

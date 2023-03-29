import PropTypes from 'prop-types'
import styles from './MenuListItem.module.scss'

export default function MenuListItem({ children }) {
    return <li className={styles.menuListItem}>{children}</li>
}

MenuListItem.propTypes = {
    children: PropTypes.node,
}

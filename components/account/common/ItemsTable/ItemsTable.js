import PropTypes from 'prop-types'

import styles from './ItemsTable.module.scss'

export default function ItemsTable({ children }) {
    return <ul className={styles.itemsTable}>{children}</ul>
}

ItemsTable.propTypes = {
    children: PropTypes.node,
}

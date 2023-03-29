import PropTypes from 'prop-types'

import styles from './TableHeader.module.scss'

export default function TableHeader({ children }) {
    return <li className={styles.header}>{children}</li>
}

TableHeader.propTypes = {
    children: PropTypes.node,
}

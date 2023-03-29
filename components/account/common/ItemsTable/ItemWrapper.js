import PropTypes from 'prop-types'

import styles from './ItemWrapper.module.scss'

export default function ItemWrapper({ children }) {
    return <li className={styles.wrapper}>{children}</li>
}

ItemWrapper.propTypes = {
    children: PropTypes.node,
}

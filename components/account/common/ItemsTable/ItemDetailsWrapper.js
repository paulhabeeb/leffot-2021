import PropTypes from 'prop-types'

import styles from './ItemDetailsWrapper.module.scss'

export default function ItemDetailsWrapper({ children }) {
    return <div className={styles.wrapper}>{children}</div>
}

ItemDetailsWrapper.propTypes = {
    children: PropTypes.node,
}

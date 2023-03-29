import PropTypes from 'prop-types'
import styles from './DetailsWrapper.module.scss'

export default function DetailsWrapper({ children }) {
    return <div className={styles.container}>{children}</div>
}

DetailsWrapper.propTypes = {
    children: PropTypes.node,
}

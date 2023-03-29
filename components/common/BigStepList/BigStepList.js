import PropTypes from 'prop-types'

import styles from './BigStepList.module.scss'

export default function BigStepList({ children }) {
    return <ul className={styles.container}>{children}</ul>
}

BigStepList.propTypes = {
    children: PropTypes.node,
}

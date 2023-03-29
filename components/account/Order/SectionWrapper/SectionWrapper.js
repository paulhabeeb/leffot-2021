import PropTypes from 'prop-types'

import styles from './SectionWrapper.module.scss'

export default function SectionWrapper({ children }) {
    return <div className={styles.container}>{children}</div>
}

SectionWrapper.propTypes = {
    children: PropTypes.node,
}

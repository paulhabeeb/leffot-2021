import PropTypes from 'prop-types'

import styles from './TotalLabel.module.scss'

export default function TotalLabel({ children, title }) {
    return (
        <div className={styles.label}>
            {title}
            {children}
        </div>
    )
}

TotalLabel.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}

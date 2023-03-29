import PropTypes from 'prop-types'

import styles from './InfoBlip.module.scss'

export default function InfoBlip({ children, title }) {
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            {children}
        </div>
    )
}

InfoBlip.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}

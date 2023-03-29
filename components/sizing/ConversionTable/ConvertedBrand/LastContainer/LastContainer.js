import PropTypes from 'prop-types'

import styles from './LastContainer.module.scss'

export default function LastContainer({ children, name }) {
    return (
        <div>
            <h4 className={styles.title}>{name}</h4>
            {children}
        </div>
    )
}

LastContainer.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
}

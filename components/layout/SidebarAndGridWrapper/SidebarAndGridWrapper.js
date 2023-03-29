import PropTypes from 'prop-types'

import styles from './SidebarAndGridWrapper.module.scss'

export default function SidebarAndGridWrapper({ children, id }) {
    return (
        <div className={styles.container} id={id}>
            {children}
        </div>
    )
}

SidebarAndGridWrapper.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
}

import PropTypes from 'prop-types'

import styles from './SidebarItem.module.scss'

export default function SidebarItem({ children, title }) {
    return (
        <section className={styles.container}>
            <div className={styles.titleWrapper}>
                <h2 className={styles.title}>{title}</h2>
            </div>
            {children}
        </section>
    )
}

SidebarItem.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}

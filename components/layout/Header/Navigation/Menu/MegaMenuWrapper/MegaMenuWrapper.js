import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './MegaMenuWrapper.module.scss'

export default function MegaMenuWrapper({ children, isOpen }) {
    return (
        <div
            className={cn(styles.megaMenu, { [styles['is-open']]: isOpen })}
            aria-hidden={!isOpen}
        >
            <div className={styles.megaMenuWrapper}>
                <ul className={styles.megaMenuList}>{children}</ul>
            </div>
        </div>
    )
}

MegaMenuWrapper.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
}

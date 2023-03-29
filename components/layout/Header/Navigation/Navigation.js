import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './Navigation.module.scss'

import AccountDropdownMenu from './AccountDropdownMenu'
import Menu from './Menu'
import QuickSearch from './QuickSearch'

export default function Navigation({
    categories,
    hideMenu,
    mobileMenuIsOpen,
    searchIsOpen,
}) {
    const containerClass = cn(styles.navContainer, {
        [styles.isOpen]: mobileMenuIsOpen,
    })

    return (
        <div className={containerClass}>
            <nav className={styles.nav} aria-label='Main navigation'>
                <QuickSearch hideMenu={hideMenu} searchIsOpen={searchIsOpen} />
                <Menu categories={categories} hideMenu={hideMenu} />
                <AccountDropdownMenu hideMenu={hideMenu} />
            </nav>
        </div>
    )
}

Navigation.propTypes = {
    categories: PropTypes.array,
    hideMenu: PropTypes.func,
    mobileMenuIsOpen: PropTypes.bool,
    searchIsOpen: PropTypes.bool,
}

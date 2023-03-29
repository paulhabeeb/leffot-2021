import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './NavIcons.module.scss'

import Account from './Account'
import Cart from './Cart'
import Search from './Search'

export default function NavIcons({
    mobileMenuIsOpen,
    searchIsOpen,
    setSearchIsOpen,
}) {
    return (
        <nav
            className={cn(styles.navIcons, {
                [styles['is-hidden']]: mobileMenuIsOpen,
            })}
            aria-label='Search, login, and cart'
        >
            <ul className={styles.navIconsList}>
                <Search
                    searchIsOpen={searchIsOpen}
                    setSearchIsOpen={setSearchIsOpen}
                />
                <Account />
                <Cart />
            </ul>
        </nav>
    )
}

NavIcons.propTypes = {
    mobileMenuIsOpen: PropTypes.bool,
    searchIsOpen: PropTypes.bool,
    setSearchIsOpen: PropTypes.func,
}

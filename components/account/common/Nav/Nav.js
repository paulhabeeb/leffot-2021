import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import accountMenuItems from '@lib/account/menu-items'
import useOutsideAlerter from '@lib/use-outside-alerter'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { urls } from '@lib/data'

import cn from 'classnames'
import styles from './Nav.module.scss'

function MenuItem({ ariaLabel, onClick, title, url }) {
    const { asPath, pathname } = useRouter()

    let isActive = pathname === url
    if (
        url === '/account' &&
        asPath.includes(urls.account.orders.single_base)
    ) {
        isActive = true
    }

    const menuItemStyles = cn(styles.menuItem, {
        [styles.active]: isActive,
    })

    return (
        <li className={menuItemStyles}>
            <Link href={url} aria-label={ariaLabel} onClick={onClick}>
                {title}
            </Link>
        </li>
    )
}

MenuItem.propTypes = {
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    url: PropTypes.string,
}

export default function AccountNav() {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const toggleMenu = () => setMenuIsOpen(!menuIsOpen)
    const closeMenu = () => setMenuIsOpen(false)

    const menuRef = useRef(null)
    const alerter = () => setMenuIsOpen(false)
    useOutsideAlerter(menuRef, alerter)

    const menuStyles = cn(styles.menuItemList, { [styles.isOpen]: menuIsOpen })

    return (
        <nav
            aria-label='Account navigation'
            className={styles.nav}
            ref={menuRef}
        >
            <button
                className={styles.menuButton}
                onClick={toggleMenu}
                onKeyPress={toggleMenu}
            >
                <span className={styles.menuButtonIcon}></span>
                <span className={styles.menuButtonCaption}>Menu</span>
            </button>
            <ul className={menuStyles}>
                {accountMenuItems.map((item, index) => (
                    <MenuItem
                        onClick={closeMenu}
                        title={item.label}
                        url={item.link}
                        key={index}
                    />
                ))}
            </ul>
        </nav>
    )
}

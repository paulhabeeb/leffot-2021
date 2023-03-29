import { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useLogout from '@framework/use-logout'
import { urls } from '@lib/data'
import accountMenuItems from '@lib/account/menu-items'

import cn from 'classnames'
import { ChevronDown } from '@components/icons'
import AccountDropdownWrapper from './AccountDropdownWrapper'
import styles from './LoggedInDropdownMenu.module.scss'

function AccountMenuItem({ label, link, onClick }) {
    return (
        <li>
            <Link href={link} className={styles.submenuLink} onClick={onClick}>
                {label}
            </Link>
        </li>
    )
}

AccountMenuItem.propTypes = {
    label: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
}

export default function LoggedInDropdownMenu({ hideMenu }) {
    const [submenuIsOpen, setSubmenuIsOpen] = useState(false)
    const router = useRouter()
    const logout = useLogout()

    const handleLogout = async () => {
        await logout()
        hideMenu()
        router.push(urls.auth.login)
    }

    const onClick = event => {
        event.preventDefault()
        setSubmenuIsOpen(!submenuIsOpen)
    }

    return (
        <>
            <AccountDropdownWrapper>
                <Link
                    href={urls.account.index}
                    className={styles.link}
                    onClick={onClick}
                    onKeyPress={onClick}
                >
                    Account
                    <ChevronDown
                        className={cn(styles.icon, {
                            [styles['is-open']]: submenuIsOpen,
                        })}
                    />
                </Link>
                <div aria-hidden={!submenuIsOpen}>
                    <ul
                        className={cn(styles.submenu, {
                            [styles['is-open']]: submenuIsOpen,
                        })}
                    >
                        {accountMenuItems.map((item, index) => (
                            <AccountMenuItem
                                label={item.label}
                                link={item.link}
                                onClick={hideMenu}
                                key={index}
                            />
                        ))}
                    </ul>
                </div>
            </AccountDropdownWrapper>
            <AccountDropdownWrapper>
                <button
                    className={cn(styles.link, styles.logoutButton)}
                    onClick={handleLogout}
                >
                    Sign out
                </button>
            </AccountDropdownWrapper>
        </>
    )
}

LoggedInDropdownMenu.propTypes = {
    hideMenu: PropTypes.func,
}

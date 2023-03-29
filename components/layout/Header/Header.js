import { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useEvent } from '@lib/use-event'
import { urls } from '@lib/data'

import cn from 'classnames'
import styles from './Header.module.scss'

import { Banner } from '@components/common'
import { LeffotLogo } from '@components/icons'
import NavIcons from './NavIcons'
import Navigation from './Navigation'
import SkipNav from './SkipNav'

export default function Header({ banner, categories }) {
    const [searchIsOpen, setSearchIsOpen] = useState(false)
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
    const router = useRouter()
    const homeLink = urls.home.replace(urls.baseUrl, '')

    const showMenu = () => {
        document.documentElement.classList.add('nav-open')
        document.body.classList.add('has-activeNavPages')
        setMobileMenuIsOpen(true)
    }

    const hideMenu = () => {
        document.documentElement.classList.remove('nav-open')
        document.body.classList.remove('has-activeNavPages')
        setMobileMenuIsOpen(false)
    }

    const onMobileMenuClick = event => {
        event.preventDefault()

        if (mobileMenuIsOpen) {
            hideMenu()
        } else {
            showMenu()
        }
    }

    const handleLogoClick = event => {
        event.preventDefault()

        if (router.pathname === '/') {
            window.location = '/'
        } else {
            router.push(homeLink)
        }
    }

    useEvent('resize', () => {
        if (window.innerWidth >= 1040) {
            hideMenu()
        }
    })

    const headerClass = cn(styles.header, {
        [styles.isOpen]: mobileMenuIsOpen,
    })

    const logoClass = cn(styles.logoWrapper, {
        [styles.hideLogo]: mobileMenuIsOpen,
    })

    return (
        <>
            <div id='top'>
                <SkipNav link='#main' />
                <Banner banner={banner} type='banner' />
            </div>
            <header className={headerClass}>
                <div className={styles.headerWrapper}>
                    <button
                        aria-expanded={mobileMenuIsOpen}
                        className={styles.mobileMenuToggle}
                        onClick={onMobileMenuClick}
                        onKeyPress={onMobileMenuClick}
                    >
                        <span className={styles.mobileMenuToggleText}>
                            Toggle menu
                        </span>
                    </button>
                    <div className={logoClass}>
                        <a href={homeLink} onClick={handleLogoClick}>
                            <LeffotLogo className={styles.logo} />
                        </a>
                    </div>
                    <Navigation
                        categories={categories}
                        mobileMenuIsOpen={mobileMenuIsOpen}
                        searchIsOpen={searchIsOpen}
                        hideMenu={hideMenu}
                    />
                    <NavIcons
                        mobileMenuIsOpen={mobileMenuIsOpen}
                        searchIsOpen={searchIsOpen}
                        setSearchIsOpen={setSearchIsOpen}
                    />
                </div>
            </header>
        </>
    )
}

Header.propTypes = {
    banner: PropTypes.object,
    categories: PropTypes.array,
}

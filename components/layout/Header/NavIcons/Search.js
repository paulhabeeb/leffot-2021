import { useRef } from 'react'
import PropTypes from 'prop-types'
import useOutsideAlerter from '@lib/use-outside-alerter'

import styles from './NavIcons.module.scss'
import { Search as SearchIcon } from '@components/icons'

export default function Search({ searchIsOpen, setSearchIsOpen }) {
    const searchRef = useRef(null)
    const searchAlerter = event => {
        if (!event.target.closest('#quickSearch')) {
            setSearchIsOpen(false)
        }
    }
    useOutsideAlerter(searchRef, searchAlerter)

    const onSearchClick = event => {
        event.preventDefault()
        setSearchIsOpen(!searchIsOpen)
    }

    return (
        <li className={styles.navIconSearch}>
            <button
                data-search='quickSearch'
                aria-controls='quickSearch'
                aria-expanded={searchIsOpen}
                className={styles.searchButton}
                onClick={onSearchClick}
                onKeyPress={onSearchClick}
                ref={searchRef}
            >
                <span className='visuallyHidden'>Search</span>
                <SearchIcon styles={styles.searchIcon} tabIndex='-1' />
            </button>
        </li>
    )
}

Search.propTypes = {
    searchIsOpen: PropTypes.bool,
    setSearchIsOpen: PropTypes.func,
}

import PropTypes from 'prop-types'
import cn from 'classnames'

import { SearchForm } from '@components/search'
import styles from './QuickSearch.module.scss'

export default function QuickSearch({ hideMenu, searchIsOpen }) {
    const inputName = 'search_query'

    const container = cn(styles.quickSearch, {
        [styles.isOpen]: searchIsOpen,
    })

    return (
        <div className={container} id='quickSearch'>
            <div className={styles.container}>
                <SearchForm
                    hideMenu={hideMenu}
                    inputName={inputName}
                    margin='none'
                    style='wide'
                />
            </div>
        </div>
    )
}

QuickSearch.propTypes = {
    hideMenu: PropTypes.func,
    searchIsOpen: PropTypes.bool,
}

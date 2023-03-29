import PropTypes from 'prop-types'

import { ErrorBoundary } from '@components/common'
import { SearchForm } from '@components/search'
import styles from './SearchError.module.scss'

export default function SearchError({ caption, title }) {
    return (
        <ErrorBoundary>
            <main id='main' className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.caption}>{caption}</p>
                <SearchForm />
            </main>
        </ErrorBoundary>
    )
}

SearchError.propTypes = {
    caption: PropTypes.string,
    title: PropTypes.string,
}

import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import { ErrorBoundary } from '@components/common'
import styles from './Filters.module.scss'

export default function Filters({
    filters,
    mobileFilters,
    selectedFilters,
    sidebarButtons,
}) {
    const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

    return (
        <aside className={styles.filters}>
            <ErrorBoundary>
                {isMobile ? (
                    <>
                        {sidebarButtons}
                        {selectedFilters}
                        {mobileFilters}
                    </>
                ) : (
                    <>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Filter by</h2>
                        </div>
                        {selectedFilters}
                        {filters}
                    </>
                )}
            </ErrorBoundary>
        </aside>
    )
}

Filters.propTypes = {
    filters: PropTypes.node,
    mobileFilters: PropTypes.node,
    selectedFilters: PropTypes.node,
    sidebarButtons: PropTypes.node,
}

import PropTypes from 'prop-types'
import cn from 'classnames'

import SelectedFilter from './SelectedFilter'
import styles from './SelectedFilters.module.scss'

function ClearSelectedFilters({ onClick }) {
    const handleClick = () => onClick('', '', false, true)

    return (
        <button className={styles.clearFilters} onClick={handleClick}>
            Clear all filters
        </button>
    )
}

ClearSelectedFilters.propTypes = {
    onClick: PropTypes.func,
}

export default function SelectedFilters({ context, filters, onClick }) {
    if (filters && filters.length > 0) {
        const container = cn(styles.container, {
            [styles.bottomBorder]: context !== 'modal',
        })

        return (
            <div className={container}>
                <div className={styles.head}>
                    <h3 className={styles.selectedFilters}>Selected Filters</h3>
                    <ClearSelectedFilters onClick={onClick} />
                </div>
                <ul>
                    {filters.map((filter, index) => (
                        <SelectedFilter
                            key={index}
                            onClick={() =>
                                onClick(filter.slug, filter.value, true)
                            }
                            title={filter.value}
                        />
                    ))}
                </ul>
                <div className={styles.desktopClearFilters}>
                    <ClearSelectedFilters onClick={onClick} />
                </div>
            </div>
        )
    }

    return null
}

SelectedFilters.propTypes = {
    context: PropTypes.string,
    filters: PropTypes.array,
    onClick: PropTypes.func,
}

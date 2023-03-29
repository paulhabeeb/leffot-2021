import PropTypes from 'prop-types'

import ShowMoreFilters from './ShowMoreFilters'
import styles from './FilterItemsList.module.scss'

export default function FilterItemsList({
    children,
    hasMoreResults,
    isExpanded,
    onClick,
    showMoreLabel,
}) {
    return (
        <>
            <ul className={styles.list}>{children}</ul>
            {hasMoreResults && (
                <ShowMoreFilters
                    isExpanded={isExpanded}
                    onClick={onClick}
                    showMoreLabel={showMoreLabel}
                />
            )}
        </>
    )
}

FilterItemsList.propTypes = {
    children: PropTypes.node,
    hasMoreResults: PropTypes.bool,
    isExpanded: PropTypes.bool,
    onClick: PropTypes.func,
    showMoreLabel: PropTypes.string,
}

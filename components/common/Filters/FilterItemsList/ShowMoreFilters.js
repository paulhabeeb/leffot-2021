import PropTypes from 'prop-types'

import styles from './ShowMoreFilters.module.scss'

export default function ShowMoreFilters({
    isExpanded,
    onClick,
    showMoreLabel,
}) {
    const mobileLabel = isExpanded ? 'Fewer' : 'More'
    const desktopLabel = isExpanded ? 'fewer –' : 'more +'

    return (
        <div className={styles.showMoreContainer}>
            <button className={styles.showMore} onClick={onClick} type='button'>
                <span className={styles.mobileLabel}>
                    Show {mobileLabel} {showMoreLabel}
                </span>
                <span className={styles.desktopLabel} aria-hidden>
                    Show {desktopLabel}
                </span>
            </button>
        </div>
    )
}

ShowMoreFilters.propTypes = {
    isExpanded: PropTypes.bool,
    onClick: PropTypes.func,
    showMoreLabel: PropTypes.string,
}

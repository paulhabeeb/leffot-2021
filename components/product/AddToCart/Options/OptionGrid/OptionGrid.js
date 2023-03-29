import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './OptionGrid.module.scss'

export default function OptionGrid({
    children,
    isFourColumns,
    isOneColumn,
    isSixColumns,
    isThreeColumns,
    isTwoColumns,
}) {
    const className = cn(styles.options, {
        [styles.fourCols]: isFourColumns,
        [styles.oneCol]: isOneColumn,
        [styles.sixCols]: isSixColumns,
        [styles.threeCols]: isThreeColumns,
        [styles.twoCols]: isTwoColumns,
    })

    return <div className={className}>{children}</div>
}

OptionGrid.propTypes = {
    children: PropTypes.node,
    isFourColumns: PropTypes.bool,
    isOneColumn: PropTypes.bool,
    isSixColumns: PropTypes.bool,
    isThreeColumns: PropTypes.bool,
    isTwoColumns: PropTypes.bool,
}

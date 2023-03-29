import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './TableHeaderItem.module.scss'

export default function TableHeaderItem({ style, title }) {
    const className = cn(styles.headerItem, {
        [styles.center]: style === 'center',
        [styles.right]: style === 'right',
    })

    return <div className={className}>{title}</div>
}

TableHeaderItem.propTypes = {
    style: PropTypes.string,
    title: PropTypes.string,
}

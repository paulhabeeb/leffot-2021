import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './TabularItem.module.scss'

export default function TabularItem({ children, style }) {
    const className = cn(styles.tabular, {
        [styles.center]: style === 'center',
        [styles.right]: style === 'right',
    })

    return <div className={className}>{children}</div>
}

TabularItem.propTypes = {
    children: PropTypes.node,
    style: PropTypes.string,
}

import PropTypes from 'prop-types'

import cn from 'classnames'
import TotalLabel from '../TotalLabel'
import styles from './TotalLine.module.scss'

export default function TotalLine({ children, hasDivider, title }) {
    const className = cn(styles.totalLine, {
        [styles.divider]: hasDivider,
    })

    return (
        <li className={className}>
            {title && <TotalLabel title={title} />}
            {children}
        </li>
    )
}

TotalLine.propTypes = {
    children: PropTypes.node,
    hasDivider: PropTypes.bool,
    title: PropTypes.string,
}

import PropTypes from 'prop-types'
import cn from 'classnames'
import { currencyFormatter } from '@lib/currency-formatter'

import styles from './TotalValue.module.scss'

export default function TotalValue({ children, size, value }) {
    const className = cn(styles.value, {
        [styles.largeValue]: size === 'large',
    })

    const formattedValue = Number.isNaN(Number(value))
        ? null
        : currencyFormatter.format(value)

    return (
        <div className={className}>
            {formattedValue && <span>{formattedValue}</span>}
            {children}
        </div>
    )
}

TotalValue.propTypes = {
    children: PropTypes.node,
    size: PropTypes.string,
    value: PropTypes.number,
}

import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './FormRow.module.scss'

export default function FormRow({ children, margin, style }) {
    const className = cn(styles.formRow, {
        [styles.formRowFlex]: style === 'flex',
        [styles.formRowHalf]: style === 'half',
        [styles.formRowThird]: style === 'third',
        [styles.noMargin]: margin === 'none',
    })

    return <div className={className}>{children}</div>
}

FormRow.propTypes = {
    children: PropTypes.node,
    margin: PropTypes.string,
    style: PropTypes.string,
}

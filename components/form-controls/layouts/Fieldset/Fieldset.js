import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './Fieldset.module.scss'

export default function Fieldset({ children, className }) {
    return (
        <fieldset className={cn(styles.fieldset, className)}>
            {children}
        </fieldset>
    )
}

Fieldset.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

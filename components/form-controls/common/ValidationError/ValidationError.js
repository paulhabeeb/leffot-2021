import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './ValidationError.module.scss'

export default function ValidationError({ customStyles, meta, style }) {
    if (meta.touched && meta.error) {
        const className = cn(styles.error, customStyles, {
            [styles.inline]: style === 'inline',
        })

        return <div className={className}>{meta.error}</div>
    }

    return null
}

ValidationError.defaultProps = {
    style: 'block',
}

ValidationError.propTypes = {
    customStyles: PropTypes.string,
    meta: PropTypes.object,
    style: PropTypes.string,
}

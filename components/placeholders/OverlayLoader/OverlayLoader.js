import PropTypes from 'prop-types'
import cn from 'classnames'

import CircleLoader from '../CircleLoader'
import styles from './OverlayLoader.module.scss'

export default function OverlayLoader({ customStyles, loaderSize, style }) {
    const fill =
        style === 'dark' ? 'var(--color-white)' : 'var(--color-medium-grey)'
    const className = cn(customStyles, styles.circle, {
        [styles.dark]: style === 'dark',
        [styles.transparent]: style === 'transparent',
    })

    return (
        <div className={className}>
            <CircleLoader fill={fill} size={loaderSize} />
        </div>
    )
}

OverlayLoader.defaultProps = {
    loaderSize: 48,
    style: 'dark',
}

OverlayLoader.propTypes = {
    customStyles: PropTypes.string,
    loaderSize: PropTypes.number,
    style: PropTypes.string,
}

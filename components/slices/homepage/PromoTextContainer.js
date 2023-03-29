import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './PromoTextContainer.module.scss'

export default function PromoTextContainer({
    children,
    index,
    isLarge,
    wrapperBackground,
}) {
    const container = cn(styles.container, {
        [styles.large]: isLarge,
        [styles.small]: !isLarge,
        [styles.reverse]: index % 2 === 0,
        [styles.whiteText]:
            wrapperBackground === 'var(--color-primary)' ||
            wrapperBackground === 'var(--color-rust)',
    })

    return <div className={container}>{children}</div>
}

PromoTextContainer.defaultProps = {
    isLarge: false,
}

PromoTextContainer.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number,
    isLarge: PropTypes.bool,
    wrapperBackground: PropTypes.string,
}

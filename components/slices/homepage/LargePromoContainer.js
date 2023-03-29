import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './LargePromoContainer.module.scss'

export default function LargePromoContainer({ children, index }) {
    const container = cn(styles.container, {
        [styles.reverse]: index % 2 === 0,
    })

    return <div className={container}>{children}</div>
}

LargePromoContainer.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
}

import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Wrapper.module.scss'

export default function Wrapper({ children, context }) {
    const className = cn(styles.price, {
        [styles.productPage]: context === 'product',
    })

    return <div className={className}>{children}</div>
}

Wrapper.propTypes = {
    children: PropTypes.node,
    context: PropTypes.string,
}

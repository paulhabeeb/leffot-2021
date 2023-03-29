import PropTypes from 'prop-types'
import cn from 'classnames'

import { ApplePayButton, CheckoutButton, PayPalButton } from './Buttons'
import styles from './CartActions.module.scss'

export default function CartActions({ location }) {
    return (
        <div className={cn({ [styles.top]: location === 'top' })}>
            <CheckoutButton />
            <ApplePayButton />
            <PayPalButton location={location} />
        </div>
    )
}

CartActions.defaultProps = {
    location: 'sidebar',
}

CartActions.propTypes = {
    location: PropTypes.string,
}

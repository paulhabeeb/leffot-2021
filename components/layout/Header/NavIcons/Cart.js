import { useRef, useState } from 'react'
import { urls } from '@lib/data'
import useOutsideAlerter from '@lib/use-outside-alerter'

import { Cart as CartIcon } from '@components/icons'
import PreviewCart from './PreviewCart'
import styles from './NavIcons.module.scss'

export default function Cart() {
    const [cartIsOpen, setCartIsOpen] = useState(false)

    const cartRef = useRef(null)
    const cartAlerter = event => {
        if (!event.target.closest('#previewCart')) {
            setCartIsOpen(false)
        }
    }
    useOutsideAlerter(cartRef, cartAlerter)

    const onCartClick = event => {
        // Redirect to full cart page
        //
        // https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
        // In summary, we recommend looking for the string 'Mobi' anywhere in the User Agent to detect a mobile device.
        if (/Mobi/i.test(navigator.userAgent)) {
            return event.stopPropagation()
        }

        event.preventDefault()
        setCartIsOpen(!cartIsOpen)
    }

    return (
        <li id='previewCart' className={styles.navIcon}>
            <a
                href={urls.cart}
                onClick={onCartClick}
                onKeyPress={onCartClick}
                ref={cartRef}
            >
                <span className='visuallyHidden'>Cart</span>
                <CartIcon styles={styles.icon} />
            </a>
            {cartIsOpen && <PreviewCart />}
        </li>
    )
}

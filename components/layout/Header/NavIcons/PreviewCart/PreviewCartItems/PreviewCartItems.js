import PropTypes from 'prop-types'
import { giftCard } from '@lib/data'

import PreviewCartActions from '../PreviewCartActions'
import PreviewCartItem from '../PreviewCartItem'
import styles from './PreviewCartItems.module.scss'

export default function PreviewCartItems({ cart, maxItems }) {
    if (!cart) {
        return (
            <div className={styles.emptyCart}>
                <span>Your cart is empty.</span>
            </div>
        )
    }

    const { custom_items, digital_items, gift_certificates, physical_items } =
        cart.line_items

    const updatedGiftCerts = gift_certificates.map(gift => {
        return {
            ...gift,
            type: 'gift_certificate',
        }
    })

    const items = physical_items.concat(
        custom_items,
        digital_items,
        updatedGiftCerts
    )

    const itemsToShow = []
    let extraItemsMessage = null

    for (let i = 0; i < items.length; i++) {
        if (i === maxItems) {
            break
        }

        // If we're to the maxItem and there are still more items, show a message to the user
        if (i === maxItems - 1 && items.length > maxItems) {
            const extraItems = items.length - maxItems
            extraItemsMessage = `${extraItems} more items in your cart`
            if (extraItems === 1) {
                extraItemsMessage = `${extraItems} more item in your cart`
            }
        }

        let extraOptions = { currencyCode: cart.currency.code }

        if (items[i].type === 'gift_certificate') {
            extraOptions = {
                ...extraOptions,
                image_url: giftCard.product.images[0].urlOriginal,
                list_price: items[i].amount,
                url: giftCard.product.path,
            }
        }

        itemsToShow.push(
            <PreviewCartItem {...items[i]} {...extraOptions} key={i} />
        )
    }

    return (
        <>
            <ul className={styles.previewCartItems}>{itemsToShow}</ul>
            {extraItemsMessage && (
                <div className={styles.extraItems}>
                    <span className={styles.extraItemsMessage}>
                        {extraItemsMessage}
                    </span>
                </div>
            )}
            <PreviewCartActions />
        </>
    )
}

PreviewCartItems.propTypes = {
    cart: PropTypes.object,
    maxItems: PropTypes.number,
}

import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'
import { giftCard } from '@lib/data'

import ItemColActions from './ItemColActions'
import ItemColImage from './ItemColImage'
import ItemColInfo from './ItemColInfo'
import ItemColPricing from './ItemColPricing'
import Pricing from './Pricing'
import styles from './CartItem.module.scss'

export default function CartItem({ currencyCode, item }) {
    const { price } = usePrice({
        amount: item.amount || item.extended_list_price,
        currencyCode,
    })
    const { price: discountedPrice } = usePrice({
        amount: item.amount || item.extended_sale_price,
        currencyCode,
    })

    let url = item.url
    let imageArray = [
        {
            alt: item.name,
            urlOriginal: item.image_url,
        },
    ]

    if (item.type === 'gift_certificate') {
        url = giftCard.product.path
        imageArray = giftCard.product.images
    }

    return (
        <tbody className={styles.cartItem}>
            <tr className={styles.cartItemRow}>
                <ItemColImage image={imageArray} />
                <ItemColInfo {...item} url={url} />
                <ItemColPricing>
                    <Pricing price={price} discountedPrice={discountedPrice} />
                </ItemColPricing>
            </tr>
            <tr className={styles.cartItemRow}>
                <td colSpan='1'></td>
                <ItemColActions
                    id={item.id}
                    inventoryLevel={item.inventoryLevel}
                    inventoryTracking={item.inventoryTracking}
                    isMutable={item.is_mutable}
                    item={item}
                    quantity={item.quantity}
                    type={item.type}
                />
            </tr>
        </tbody>
    )
}

CartItem.propTypes = {
    currencyCode: PropTypes.string,
    item: PropTypes.object,
}

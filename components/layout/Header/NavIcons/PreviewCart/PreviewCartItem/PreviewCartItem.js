import PropTypes from 'prop-types'
import Link from 'next/link'
import usePrice from '@framework/use-price'
import { formatProductTitle } from '@lib/products/restructure-data'

import styles from './PreviewCartItem.module.scss'

export default function PreviewCartItem({
    brand,
    currencyCode,
    image_url,
    list_price,
    name,
    quantity,
    sale_price,
    url,
}) {
    const nameFormatted = formatProductTitle(name)

    const { price, basePrice } = usePrice({
        amount: list_price,
        baseAmount: sale_price,
        currencyCode: currencyCode,
    })

    return (
        <li className={styles.item}>
            <div className={styles.image}>
                <img src={image_url} alt={nameFormatted} />
            </div>
            <div className={styles.details}>
                <span className={styles.brand}>{brand}</span>
                <h6 className={styles.name}>
                    {url ? (
                        <Link href={url}>{nameFormatted}</Link>
                    ) : (
                        <>{nameFormatted}</>
                    )}
                </h6>
                <span className={styles.priceWrapper}>
                    {quantity > 1 && <span>{quantity} &times;</span>}
                    {basePrice ? (
                        <>
                            <span className={styles.salePrice}>
                                {basePrice}
                            </span>
                            <span>{price}</span>
                        </>
                    ) : (
                        <span>{price}</span>
                    )}
                </span>
            </div>
        </li>
    )
}

PreviewCartItem.propTypes = {
    brand: PropTypes.string,
    currencyCode: PropTypes.string,
    image_url: PropTypes.string,
    list_price: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    sale_price: PropTypes.number,
    url: PropTypes.string,
}

import PropTypes from 'prop-types'
import Link from 'next/link'
import { formatProductTitle } from '@lib/products/restructure-data'
import { urls } from '@lib/data'

import DeliveryETA from '../DeliveryETA'
import GiftCardItemOptions from '../GiftCardItemOptions'
import ItemOptions from '../ItemOptions'
import Pricing from '../Pricing'
import styles from './ItemColInfo.module.scss'

export default function ItemColInfo({
    availabilityV2,
    brand,
    extendedListPrice,
    extendedSalePrice,
    fields,
    message,
    name,
    options,
    recipient,
    sender,
    type,
    url,
}) {
    const formattedName = formatProductTitle(name)
    const link = url ? url.replace(urls.baseUrl, '') : ''

    return (
        <td className={styles.itemColInfo}>
            {brand && <p className={styles.brand}>{brand.name}</p>}
            <h4 className={styles.itemName}>
                <Link href={link}>{formattedName}</Link>
            </h4>
            <div className={styles.itemOptions}>
                {type === 'gift_certificate' ? (
                    <GiftCardItemOptions
                        message={message}
                        recipient={recipient}
                        sender={sender}
                    />
                ) : (
                    <ItemOptions
                        brand={brand ? brand.name : null}
                        fields={fields}
                        options={options}
                    />
                )}
                <p className={styles.mobilePrice}>
                    <Pricing
                        price={extendedListPrice}
                        discountedPrice={extendedSalePrice}
                    />
                </p>
            </div>
            <DeliveryETA
                customFields={fields}
                releaseDate={availabilityV2}
                type={type}
            />
        </td>
    )
}

ItemColInfo.propTypes = {
    availabilityV2: PropTypes.object,
    brand: PropTypes.object,
    extendedListPrice: PropTypes.number,
    extendedSalePrice: PropTypes.number,
    fields: PropTypes.object,
    message: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    sender: PropTypes.object,
    recipient: PropTypes.object,
    type: PropTypes.string,
    url: PropTypes.string,
}

import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from '@lib/capitalize-first-letter'
import { monthNames } from '@lib/regex'

import { ShippingBox } from '@components/icons'
import styles from './DeliveryETA.module.scss'

export default function DeliveryETA({ customFields, releaseDate, type }) {
    let eta = 'Ready to ship'
    if (customFields && customFields.extended_eta) {
        eta = customFields.extended_eta.value
    }
    if (releaseDate && releaseDate.message) {
        const formattedDate = releaseDate.message
            .toLowerCase()
            .replace(monthNames, month => capitalizeFirstLetter(month))
        eta = `Order today, ships ${formattedDate}`
    }
    if (type === 'gift_certificate') {
        eta = 'Immediate delivery by email'
    }

    return (
        <div className={styles.itemETA}>
            <span className={styles.icon}>
                <ShippingBox />
            </span>
            <span className={styles.text}>{eta}</span>
        </div>
    )
}

DeliveryETA.propTypes = {
    customFields: PropTypes.object,
    releaseDate: PropTypes.object,
    type: PropTypes.string,
}

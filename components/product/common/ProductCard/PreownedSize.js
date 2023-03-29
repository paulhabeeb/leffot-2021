import PropTypes from 'prop-types'

import styles from './PreownedSize.module.scss'

export default function PreownedSize({ brand, fields }) {
    let caption = null

    if (fields.pow_size_uk_or_us) {
        if (fields.pow_size_uk_or_us.value === 'US') {
            caption = `US ${fields.pow_size_us.value}`
        }
        if (fields.pow_size_uk_or_us.value === 'UK') {
            caption = `UK ${fields.pow_size_uk.value}`
        }
        if (fields.pow_size_uk_or_us.value === 'EU') {
            caption = `EU ${fields.pow_size_eu.value}`
        }
        if (brand.name === 'Edward Green') {
            caption = `UK ${fields.pow_size_uk.value} / US ${fields.pow_size_us.value}`
        }
    }

    return (
        <span className={styles.caption}>
            {caption}
            {fields.pow_width && fields.pow_width.value}
        </span>
    )
}

PreownedSize.propTypes = {
    brand: PropTypes.object,
    fields: PropTypes.object,
}

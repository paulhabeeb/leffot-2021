import PropTypes from 'prop-types'
import formatLabel from '@lib/products/format-label'
import { formatProductTitle } from '@lib/products/restructure-data'
import { hasChange } from '@lib/regex'

import styles from './ItemOptions.module.scss'

function ItemOption({ brand, fields, option }) {
    const regexHasChange = RegExp(hasChange)

    if (
        option.name === 'Sole Monogram Toggle' ||
        (option.name === 'Toe plates (+ $35)' && option.value === 'None') ||
        regexHasChange.test(option.name.toLowerCase())
    ) {
        return null
    }

    const productType = fields?.product_type?.value
    const country = fields?.pow_size_uk_or_us?.value
    const isArchiveColl = fields?.archive_collection?.value === 'Yes'

    const strippedValue = formatProductTitle(option.value)
    const formattedValue = formatLabel(
        {
            brandName: brand,
            country,
            isArchiveColl,
            productType,
        },
        { displayName: option.name },
        { label: strippedValue }
    )

    return (
        <div className={styles.option}>
            <dt className={styles.optionName}>{option.name}</dt>
            <dd className={styles.optionValue}>{formattedValue}</dd>
        </div>
    )
}

ItemOption.propTypes = {
    brand: PropTypes.string,
    fields: PropTypes.object,
    option: PropTypes.object,
}

export default function ItemOptions({ brand, fields, options }) {
    if (!options) return null

    return (
        <dl className={styles.itemOptions}>
            {options.map(option => (
                <ItemOption
                    brand={brand}
                    fields={fields}
                    option={option}
                    key={option.name_id}
                />
            ))}
        </dl>
    )
}

ItemOptions.propTypes = {
    brand: PropTypes.string,
    fields: PropTypes.object,
    options: PropTypes.array,
}

import PropTypes from 'prop-types'
import styles from './Body.module.scss'
import { ProductSubtitle } from '@components/product/common'
import { Factory } from '@components/product/price'
import PreownedSize from './PreownedSize'

export default function Body({ product, fields }) {
    const { brand, isExclusive, isPreorder, isPreowned } = product

    return (
        <div className={styles.caption}>
            <ProductSubtitle
                brand={brand}
                context='category'
                isExclusive={isExclusive}
                isPreowned={isPreowned}
                isPreorder={isPreorder}
            />
            <div className={styles.titleWrapper}>
                <h3 className={styles.title}>{product.name}</h3>
                {isPreowned && <PreownedSize brand={brand} fields={fields} />}
            </div>
            {product.prices && <Factory context='category' {...product} />}
        </div>
    )
}

Body.propTypes = {
    fields: PropTypes.object,
    product: PropTypes.object,
}

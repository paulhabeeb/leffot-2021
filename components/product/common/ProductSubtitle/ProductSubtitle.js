import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './ProductSubtitle.module.scss'

function BrandName({ brand, isExclusive, isPreowned }) {
    if (brand && !isPreowned) {
        const showExclusive =
            isExclusive &&
            (brand.name === 'Alden' ||
                brand.name === 'Steele' ||
                brand.name === 'PML' ||
                brand.name === 'Pommella' ||
                brand.name === 'Justo Gimeno' ||
                brand.name === 'Fox Brothers' ||
                brand.name === 'Edward Green')

        return (
            <div
                className={styles.brand}
                itemProp='brand'
                itemScope
                itemType='http://schema.org/Brand'
            >
                <span itemProp='name'>
                    {brand.name}
                    {showExclusive && ' x Leffot'}
                </span>
            </div>
        )
    }

    return null
}

BrandName.propTypes = {
    brand: PropTypes.object,
    isExclusive: PropTypes.bool,
    isPreowned: PropTypes.bool,
}

export default function ProductSubtitle({
    brand,
    context,
    isExclusive,
    isPreowned,
    isPreorder,
}) {
    const className = cn(styles.subtitle, {
        [styles.product]: context === 'product',
    })

    return (
        <div className={className}>
            {isPreorder && <div className={styles.preorder}>Pre-order</div>}
            <BrandName
                brand={brand}
                isExclusive={isExclusive}
                isPreowned={isPreowned}
            />
        </div>
    )
}

ProductSubtitle.propTypes = {
    brand: PropTypes.object,
    context: PropTypes.string,
    isExclusive: PropTypes.bool,
    isPreowned: PropTypes.bool,
    isPreorder: PropTypes.bool,
}

ProductSubtitle.defaultProps = {
    isExclusive: false,
}

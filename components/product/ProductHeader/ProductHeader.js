import PropTypes from 'prop-types'

import { ProductSubtitle } from '@components/product/common'
import { SmartFactory } from '@components/product/price'
import ArchiveHeader from './ArchiveHeader'
import HeaderContainer from './HeaderContainer'
import ProductHeaderMessage from './ProductHeaderMessage'
import ProductTitle from './ProductTitle'
import styles from './ProductHeader.module.scss'

export default function ProductHeader({ product }) {
    if (product.isArchiveColl) {
        return (
            <ArchiveHeader
                brand={product.brand}
                productName={product.name}
                releaseDate={product.releaseDate}
            />
        )
    }

    const extendedETAMessage = product?.fields?.extended_eta?.value

    return (
        <HeaderContainer>
            <ProductSubtitle
                brand={product.brand}
                context='product'
                isExclusive={product.isExclusive}
                isPreowned={product.isPreowned}
                isPreorder={product.isPreorder}
            />
            <ProductTitle productName={product.name} />
            {product.isOnlineExclusive ? (
                <div className={styles.container}>
                    <SmartFactory context='product' {...product} />
                    <div className={styles.message}>Online Exclusive</div>
                </div>
            ) : (
                <SmartFactory context='product' {...product} />
            )}
            {extendedETAMessage && (
                <ProductHeaderMessage message={extendedETAMessage} />
            )}
        </HeaderContainer>
    )
}

ProductHeader.propTypes = {
    product: PropTypes.object,
}

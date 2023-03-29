import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { useProductContext } from '@components/product'
import styles from './Wrapper.module.scss'

export default function Wrapper({ details, gallery, product }) {
    const {
        setAvailableOptions,
        setDefaultImage,
        setImageIsLoading,
        setPrices,
    } = useProductContext()

    useEffect(() => {
        setAvailableOptions(product.productOptions)
        setDefaultImage(product.defaultImage)
        setImageIsLoading(true)
        setPrices(product.prices)
    }, [product.path]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <main id='main' className={styles.container}>
            <div className={styles.productDetails}>{details}</div>
            {gallery}
        </main>
    )
}

Wrapper.propTypes = {
    details: PropTypes.node,
    gallery: PropTypes.node,
    product: PropTypes.object,
}

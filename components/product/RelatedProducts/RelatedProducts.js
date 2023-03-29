import PropTypes from 'prop-types'

import ProductCard from '../common/ProductCard'
import styles from './RelatedProducts.module.scss'

export default function RelatedProducts({ products }) {
    if (!products || products.length < 1) {
        return null
    }

    const MAX_PRODUCTS = products.length < 4 ? products.length : 4

    const cards = []
    for (let i = 0; i < MAX_PRODUCTS; i++) {
        const product = products[i]
        cards.push(<ProductCard product={product} key={product.path} />)
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Related Products</h2>
                <span className={styles.caption}>
                    You may also be interested in these items...
                </span>
            </div>
            <ul className={styles.products} datalistname='Related Products'>
                {cards}
            </ul>
        </section>
    )
}

RelatedProducts.propTypes = {
    products: PropTypes.array,
}

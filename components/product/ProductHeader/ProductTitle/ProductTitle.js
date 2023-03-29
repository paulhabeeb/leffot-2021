import PropTypes from 'prop-types'
import styles from './ProductTitle.module.scss'

export default function ProductTitle({ productName }) {
    return (
        <h1 className={styles.title} itemProp='name'>
            {productName}
        </h1>
    )
}

ProductTitle.propTypes = {
    productName: PropTypes.string,
}

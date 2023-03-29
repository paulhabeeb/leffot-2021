import { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { LinkedCallout } from '@components/common'
import { MailingListModal } from '@components/modals'
import { ProductCard } from '@components/product/common'
import NoProducts from '../NoProducts'
import styles from './ProductGrid.module.scss'

export default function ProductGrid({
    context,
    isOneCol,
    isPreownedCategory,
    products,
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const toggleModal = () => setModalIsOpen(!modalIsOpen)

    const cards = []
    products.forEach((product, index) => {
        if (product.cardType === 'linked-callout') {
            cards.push(
                <LinkedCallout
                    {...product}
                    toggleModal={isPreownedCategory ? toggleModal : null}
                    isOneCol={product.position === 0 ? true : isOneCol}
                    key={`${product.cardType}-${index}`}
                />
            )
        }
        if (product.cardType === 'gift-card') {
            cards.push(<ProductCard product={product} key={product.cardType} />)
        }
        if (product.cardType === 'product') {
            cards.push(<ProductCard product={product} key={product.path} />)
        }
    })

    const className = cn(styles.productGrid, {
        [styles.oneUp]: isOneCol,
        [styles.twoUp]: !isOneCol,
    })

    return (
        <>
            {cards.length > 0 ? (
                <ul className={className}>{cards}</ul>
            ) : (
                <NoProducts context={context} />
            )}
            {isPreownedCategory && (
                <MailingListModal
                    isOpen={modalIsOpen}
                    isPreowned={true}
                    toggleModal={toggleModal}
                />
            )}
        </>
    )
}

ProductGrid.propTypes = {
    context: PropTypes.string,
    isOneCol: PropTypes.bool,
    isPreownedCategory: PropTypes.bool,
    products: PropTypes.array,
}

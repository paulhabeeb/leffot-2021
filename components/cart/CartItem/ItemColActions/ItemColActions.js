import { useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import useRemoveItem from '@framework/cart/use-remove-item'

import { useCartContext } from '../../CartContext'
import ActionButton from '../ActionButton'
import Incrementer from '../Incrementer'
import styles from './ItemColActions.module.scss'

export default function ItemColActions({
    id,
    isMutable,
    item,
    quantity,
    type,
}) {
    const { revalidateCart } = useCartContext()
    const [isLoading, setIsLoading] = useState(false)
    const [itemError, setItemError] = useState(null)
    const removeItem = useRemoveItem()

    const handleRemoveItem = async itemId => {
        setIsLoading(true)

        try {
            await removeItem({ id: itemId })
            revalidateCart()
            setIsLoading(false)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        } catch (error) {
            setItemError(error)
            setIsLoading(false)
            Sentry.captureException(error)
        }
    }

    return (
        <td className={styles.container}>
            <div className={styles.cartItemActions}>
                <Incrementer
                    id={id}
                    isMutable={isMutable}
                    item={item}
                    quantity={quantity}
                    setItemError={setItemError}
                    type={type}
                />
                {(isMutable || type === 'gift_certificate') && (
                    <div className={styles.editRemove}>
                        <ActionButton
                            isLoading={isLoading}
                            marginLeft='half'
                            onClick={() => handleRemoveItem(id)}
                            padding='large'
                        >
                            Remove
                        </ActionButton>
                    </div>
                )}
            </div>
            {itemError !== null && (
                <div className={styles.errors}>{itemError}</div>
            )}
        </td>
    )
}

ItemColActions.propTypes = {
    id: PropTypes.string,
    isMutable: PropTypes.bool,
    item: PropTypes.object,
    quantity: PropTypes.number,
    type: PropTypes.string,
}

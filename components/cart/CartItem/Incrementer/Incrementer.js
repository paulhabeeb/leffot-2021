import { useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import useRemoveItem from '@framework/cart/use-remove-item'
import useUpdateItem from '@framework/cart/use-update-item'
import * as Yup from 'yup'
import cn from 'classnames'

import { ChevronDown, ChevronUp, TrashCan } from '@components/icons'
import { OverlayLoader } from '@components/placeholders'
import { useCartContext } from '../../CartContext'
import ActionButton from '../ActionButton'
import styles from './Incrementer.module.scss'

export default function Incrementer({
    id,
    isMutable,
    item,
    quantity,
    setItemError,
    type,
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState(quantity)
    const { revalidateCart } = useCartContext()
    const removeItem = useRemoveItem()
    const updateItem = useUpdateItem(item, {
        include: [
            'line_items.physical_items.options',
            'line_items.digital_items.options',
        ],
    })

    if (type === 'gift_certificate') {
        return null
    }

    const loaderStyles = cn(styles.loader, { [styles.active]: isLoading })

    const inputName = `qty-${id}`
    const schema = Yup.number()
        .required('Quantity is required.')
        .integer('Quantity must be a whole number.')
        .typeError('Quantity must be a number.')

    const validateAndUpdate = async newValue => {
        const oldValue = value
        setValue(newValue)

        try {
            await schema.validate(newValue)
            setItemError(null)
            setIsLoading(true)

            if (newValue === 0) {
                await removeItem({ id: id })
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            } else {
                await updateItem({
                    quantity: parseInt(newValue),
                })
            }

            revalidateCart()
            setIsLoading(false)
        } catch (error) {
            let errorMessage =
                error.error || 'There was a problem updating this item.'
            if (
                error?.errors?.[0]?.message.includes(
                    'does not have sufficient stock'
                )
            ) {
                errorMessage = `${item.name} does not have enough stock to fulfill this request.`
            }

            setItemError(errorMessage)
            setValue(oldValue)
            setIsLoading(false)
            Sentry.captureException(error)
        }
    }

    return (
        <div className={styles.incrementer}>
            <OverlayLoader customStyles={loaderStyles} />
            <label className='visuallyHidden' htmlFor={inputName}>
                Quantity
            </label>
            <ActionButton
                borderBottom={false}
                borderTop={false}
                caption='Decrease Quantity:'
                isShown={isMutable}
                onClick={() => validateAndUpdate(value - 1)}
            >
                {quantity === 1 ? <TrashCan /> : <ChevronDown />}
            </ActionButton>
            <input
                aria-live='polite'
                className={styles.input}
                disabled={!isMutable}
                id={inputName}
                name={inputName}
                onChange={event => validateAndUpdate(event.target.value)}
                type='tel'
                value={value}
            />
            <ActionButton
                borderBottom={false}
                borderTop={false}
                caption='Increase Quantity:'
                isShown={isMutable}
                onClick={() => validateAndUpdate(value + 1)}
            >
                <ChevronUp />
            </ActionButton>
        </div>
    )
}

Incrementer.propTypes = {
    id: PropTypes.string,
    isMutable: PropTypes.bool,
    item: PropTypes.object,
    quantity: PropTypes.number,
    setItemError: PropTypes.func,
    type: PropTypes.string,
}

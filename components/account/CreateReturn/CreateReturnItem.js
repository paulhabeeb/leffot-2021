import { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { Select } from '@leffot/form-controls'
import cn from 'classnames'

import { ItemImage, ItemName, ItemOptions } from '@components/account/common'
import styles from './CreateReturnItem.module.scss'

export default function CreateReturnItem({
    id,
    image,
    name,
    product_options,
    quantity,
    type,
}) {
    const [added, setAdded] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [showCheckmark, setShowCheckmark] = useState(false)
    const { setFieldValue, values } = useFormikContext()
    const qtySelected = values.products[id.toString()].return_qty
    const actions = ['Exchange', 'Store Credit', 'Refund']
    const reasons = [
        'Incorrect size',
        'Product not as described',
        'Product was defective',
        'Received wrong product',
        'Other (please describe)',
    ]
    const selId = `products[${id}].return_qty`
    const reasonId = `products[${id}].return_reason`
    const actionId = `products[${id}].return_action`

    const qtySel = []
    for (let i = 0; i <= quantity; i++) {
        qtySel.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }

    const removeFromReturn = event => {
        event.preventDefault()
        setFieldValue(selId, 0)
        setAdded(false)
        setShowRemove(false)
        // setFieldValue(reasonId, 'Choose one...')
        // setFieldValue(actionId, 'Choose one...')
    }

    const addToReturn = event => {
        event.preventDefault()
        setShowCheckmark(true)
        setFieldValue(selId, 1)
        setAdded(true)
        setTimeout(() => {
            setShowRemove(true)
            setShowCheckmark(false)
        }, '2000')
    }

    const wrapperClass = cn(styles.itemWrapper, {
        [styles.selected]: added,
    })

    return (
        <li className={wrapperClass}>
            <div className={styles.leftWrapper}>
                <div className={styles.item}>
                    <ItemImage
                        className={styles.itemImage}
                        image={image}
                        type={type}
                    />
                    <div>
                        <ItemName name={name} />
                        {product_options?.length > 0 && (
                            <ItemOptions options={product_options} />
                        )}
                    </div>
                </div>
                {added && (
                    <div className={styles.actions}>
                        {quantity > 1 && (
                            <div>
                                <Select
                                    id={selId}
                                    label='Quantity to return'
                                    name={selId}
                                    options={qtySel}
                                />
                            </div>
                        )}
                        <div>
                            <Select
                                disabled={qtySelected < 1}
                                hideLabel={false}
                                id={actionId}
                                label='Outcome'
                                name={actionId}
                                options={actions.map((action, index) => (
                                    <option
                                        value={action}
                                        key={`${action}.${index}`}
                                    >
                                        {action}
                                    </option>
                                ))}
                                placeholder='Choose one...'
                            />
                        </div>
                        <div>
                            <Select
                                disabled={qtySelected < 1}
                                hideLabel={false}
                                id={reasonId}
                                label='Reason'
                                name={reasonId}
                                options={reasons.map((reason, index) => (
                                    <option
                                        value={reason}
                                        key={`${reason}.${index}`}
                                    >
                                        {reason}
                                    </option>
                                ))}
                                placeholder='Choose one...'
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.rightWrapper}>
                {!showRemove ? (
                    <button
                        className={styles.addToReturnButton}
                        onClick={addToReturn}
                    >
                        {showCheckmark ? (
                            <span className={styles.iconContainer}>
                                <svg
                                    className='checkmark'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 52 52'
                                >
                                    <path
                                        className={styles.checkmarkCheck}
                                        fill='none'
                                        d='M14.1 27.2l7.1 7.2 16.7-16.8'
                                    />
                                </svg>
                            </span>
                        ) : (
                            'Add to return'
                        )}
                    </button>
                ) : (
                    <button
                        className={styles.remove}
                        onClick={removeFromReturn}
                    >
                        Remove
                    </button>
                )}
            </div>
        </li>
    )
}

CreateReturnItem.propTypes = {
    id: PropTypes.number,
    image: PropTypes.object,
    name: PropTypes.string,
    product_options: PropTypes.array,
    quantity: PropTypes.number,
    type: PropTypes.string,
}

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import { useFormikContext } from 'formik'
import cn from 'classnames'

import { ErrorMessage } from '@components/common'
import { SmartFactory } from '@components/product/price'
import PriceTally from './PriceTally'
import styles from './StickyBar.module.scss'

export default function StickyBar({ button, checkboxToggleState, product }) {
    const { errors, touched } = useFormikContext()
    const [isOpen, setIsOpen] = useState(false)
    const [height, setHeight] = useState(0)

    const handleClick = e => {
        e.preventDefault()
        const newHeight = isOpen ? 0 : 'auto'

        setHeight(newHeight)
        setIsOpen(!isOpen)
    }

    // Errors get set even if an option hasn't been touched yet,
    // so we can't rely only on the errors object when we show our
    // error message. Here we loop through the fields that have been
    // touched and see if any of them have an error. If so, we'll
    // show the error message.
    let hasErrors = false
    Object.keys(touched).forEach(key => {
        if (errors?.[key]) {
            hasErrors = true
        }
    })

    useEffect(() => {
        document.body.classList.add('has-stickyBar')

        return function cleanup() {
            document.body.classList.remove('has-stickyBar')
        }
    }, [])

    const priceComponent = <SmartFactory context='product' {...product} />

    const className = cn(styles.showOptionsButton, {
        [styles.isOpen]: isOpen,
    })

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.actions}>
                    {priceComponent}
                    <button
                        className={className}
                        onClick={handleClick}
                        onKeyPress={handleClick}
                        type='button'
                    >
                        {isOpen ? 'Hide' : 'Show'} options
                    </button>
                </div>
                <div className={styles.buttonWrapper}>{button}</div>
                <AnimateHeight
                    duration={200}
                    height={height}
                    className='product-options'
                >
                    <PriceTally
                        checkboxToggleState={checkboxToggleState}
                        priceComponent={priceComponent}
                        product={product}
                    />
                </AnimateHeight>
            </div>
            {hasErrors && (
                <ErrorMessage
                    className={styles.error}
                    message='Please select all required options'
                />
            )}
        </div>
    )
}

StickyBar.propTypes = {
    button: PropTypes.element,
    checkboxToggleState: PropTypes.object,
    product: PropTypes.object,
}

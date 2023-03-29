import { useState } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'

import { Pencil } from '@components/icons'
import EstimatorForm from './EstimatorForm'
import Quotes from './Quotes'
import ActionButton from '../ActionButton'
import ShowHideButton from '../ShowHideButton'
import TotalLabel from '../TotalLabel'
import TotalLine from '../TotalLine'
import TotalValue from '../TotalValue'
import styles from './ShippingEstimator.module.scss'

export default function ShippingEstimator({
    consignments,
    currency,
    id,
    line_items,
    shipping_cost_total_ex_tax,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [quotes, setQuotes] = useState(null)
    const hasQuote =
        consignments?.length > 0 && consignments[0]?.selected_shipping_option

    return (
        <TotalLine>
            <TotalLabel title='Shipping' />
            {hasQuote ? (
                <>
                    {isOpen ? (
                        <TotalValue>
                            <ShowHideButton
                                label='Cancel'
                                onClick={() => setIsOpen(false)}
                                type='secondary'
                            />
                        </TotalValue>
                    ) : (
                        <>
                            <TotalValue value={shipping_cost_total_ex_tax} />
                            <ActionButton
                                buttonLabel='Edit'
                                caption={
                                    consignments?.[0]?.selected_shipping_option
                                        .description
                                }
                                icon={<Pencil />}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </>
                    )}
                </>
            ) : (
                <TotalValue>
                    {isOpen ? (
                        <ShowHideButton
                            label='Close'
                            onClick={() => setIsOpen(false)}
                            type='secondary'
                        />
                    ) : (
                        <ShowHideButton
                            label='Get Quote'
                            onClick={() => setIsOpen(true)}
                            type='primary'
                        />
                    )}
                </TotalValue>
            )}
            <AnimateHeight duration={200} height={isOpen ? 'auto' : 0}>
                <p className={styles.caption}>
                    Enter your destination to get a shipping estimate.
                </p>
                <EstimatorForm
                    cartId={id}
                    items={line_items?.physical_items}
                    setQuotes={setQuotes}
                />
                <Quotes
                    cartId={id}
                    currencyCode={currency.code}
                    quotes={quotes}
                    setIsOpen={setIsOpen}
                />
            </AnimateHeight>
        </TotalLine>
    )
}

ShippingEstimator.propTypes = {
    consignments: PropTypes.array,
    currency: PropTypes.object,
    id: PropTypes.string,
    line_items: PropTypes.object,
    shipping_cost_total_ex_tax: PropTypes.number,
}

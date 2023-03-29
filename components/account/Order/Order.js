import { useRef } from 'react'
import PropTypes from 'prop-types'

import { Empty } from '@components/account/common'
import { ErrorBoundary } from '@components/common'
import ItemsSummary from './ItemsSummary'
import OrderDetails from './OrderDetails'
import PaymentSummary from './PaymentSummary'
import Returns from './Returns'
import styles from './Order.module.scss'

export default function Order({ order }) {
    const returnsRef = useRef(null)

    const handleTrackClick = event => {
        event.preventDefault()
        const y =
            returnsRef.current.getBoundingClientRect().top +
            window.pageYOffset -
            100
        window.scrollTo({ top: y, behavior: 'smooth' })
        window.history.pushState({}, '', `${window.location}#returns`)
    }

    return (
        <div className={styles.container}>
            <ErrorBoundary>
                {order ? (
                    <>
                        <OrderDetails
                            dateCreated={order.date_created}
                            status={order.status}
                        />
                        <ItemsSummary
                            handleTrackClick={handleTrackClick}
                            items={order.products}
                            order={order}
                        />
                        <Returns
                            currencyCode={order.currency_code}
                            returnedItems={order.returnedItems}
                            ref={returnsRef}
                        />
                        <PaymentSummary {...order} />
                    </>
                ) : (
                    <Empty caption='Sorry, this order does not exist.' />
                )}
            </ErrorBoundary>
        </div>
    )
}

Order.propTypes = {
    order: PropTypes.object,
}

import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Empty } from '@components/account/common'
import { ErrorBoundary, Paginator } from '@components/common'
import OrderCard from './OrderCard'
import styles from './Orders.module.scss'

export default function Orders({ customerId, initOrders }) {
    const ORDERS_PER_PAGE = 15

    const [orders, setOrders] = useState(initOrders)
    const [displayedOrders, setDisplayedOrders] = useState(
        initOrders.slice(0, ORDERS_PER_PAGE)
    )

    const [isLoading, setIsLoading] = useState(false)
    const [nextPageToFetch, setNextPageToFetch] = useState(3)
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_pages: orders.length > ORDERS_PER_PAGE ? 2 : 1,
    })

    const getMoreOrders = async () => {
        const { data } = await axios({
            url: '/api/bc-rest/orders',
            method: 'GET',
            params: {
                customer_id: customerId,
                sort: 'id:desc',
                limit: ORDERS_PER_PAGE,
                page: nextPageToFetch,
            },
        })

        return data || []
    }

    /*
     * The orders page is initialized with two pages worth of orders, but we display
     * only the first. So when the user requests the second page, the orders are shown
     * immediately. It's at that time that we request the third page of orders from
     * the API. We don't display them yet, but keep them hidden until the user requests
     * the third page.
     */
    const showMoreOrders = async () => {
        const newPage = pagination.current_page + 1

        setIsLoading(true)
        setDisplayedOrders(orders.slice(0, newPage * ORDERS_PER_PAGE))

        const moreOrders = await getMoreOrders()
        const newTotalPages =
            moreOrders?.length > 0
                ? pagination.total_pages + 1
                : pagination.total_pages

        setOrders([...orders, ...moreOrders])
        setPagination({
            current_page: newPage,
            total_pages: newTotalPages,
        })

        setNextPageToFetch(nextPageToFetch + 1)
        setIsLoading(false)
    }

    return (
        <ErrorBoundary>
            {displayedOrders.length > 0 ? (
                <>
                    <ul className={styles.orders}>
                        {displayedOrders.map((order, index) => (
                            <OrderCard order={order} key={index} />
                        ))}
                    </ul>
                    <Paginator
                        context='orders'
                        isLoading={isLoading}
                        onClick={showMoreOrders}
                        pagination={pagination}
                    />
                </>
            ) : (
                <Empty caption='You have not placed any orders with us. When you do, they will appear here.' />
            )}
        </ErrorBoundary>
    )
}

Orders.propTypes = {
    customerId: PropTypes.number,
    initOrders: PropTypes.array,
}

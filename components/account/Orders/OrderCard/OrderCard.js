import PropTypes from 'prop-types'
import Link from 'next/link'
import useOrderProducts from '@framework/use-order-products'
import usePrice from '@framework/use-price'

import { urls } from '@lib/data'
import formatOrderDate from '@lib/format-order-date'
import { formatProductTitle } from '@lib/products/restructure-data'

import { SubsectionTitle } from '@components/common'
import styles from './OrderCard.module.scss'

function OrderDetail({ title, detail }) {
    return (
        <div className={styles.detailWrapper}>
            <h4 className={styles.detailTitle}>{title}</h4>
            {detail}
        </div>
    )
}

OrderDetail.propTypes = {
    detail: PropTypes.node,
    title: PropTypes.string,
}

export default function OrderCard({ order }) {
    const { currency_code, date_created, id, status, total_inc_tax } = order
    const date = formatOrderDate(date_created)
    const link = urls.account.orders.single.replace(':orderId', id)

    const { data: items } = useOrderProducts({ orderId: id })
    const { price } = usePrice({
        amount: parseFloat(total_inc_tax),
        currencyCode: currency_code,
    })

    return (
        <li className={styles.card}>
            <SubsectionTitle element='h3' title={`Order #${id}`} />
            <div className={styles.flex}>
                <div className={styles.container}>
                    <div className={styles.detailContainer}>
                        <OrderDetail title='Date' detail={<p>{date}</p>} />
                        <OrderDetail title='Status' detail={<p>{status}</p>} />
                    </div>
                    <div className={styles.detailContainer}>
                        <OrderDetail title='Total' detail={<p>{price}</p>} />
                        {items && (
                            <OrderDetail
                                title='Items'
                                detail={
                                    <ul>
                                        {items.map((item, index) => {
                                            const formattedName =
                                                formatProductTitle(item.name)
                                            return (
                                                <li key={index}>
                                                    {item.quantity}&times;{' '}
                                                    {formattedName}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                }
                            />
                        )}
                    </div>
                </div>
                <div className={styles.actions}>
                    <Link
                        href={link}
                        aria-label={`View order #${id}`}
                        className={styles.button}
                    >
                        View Order Details
                    </Link>
                </div>
            </div>
        </li>
    )
}

OrderCard.propTypes = {
    order: PropTypes.object,
}

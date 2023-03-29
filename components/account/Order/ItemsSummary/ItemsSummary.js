import PropTypes from 'prop-types'

import {
    ItemsTable,
    TableHeader,
    TableHeaderItem,
} from '@components/account/common'
import { SubsectionTitle } from '@components/common'
import Address from '../Address'
import OrderItem from '../OrderItem'
import SectionWrapper from '../SectionWrapper'
import Returns from './Returns'
import Shipments from './Shipments'
import styles from './ItemsSummary.module.scss'

export default function ItemsSummary({ handleTrackClick, items, order }) {
    if (!items) {
        return null
    }

    const {
        currency_code,
        returnableItems,
        returnedItems,
        shipments,
        shipping_addresses,
    } = order

    const hasNotGiftCards = items.some(item => item.type !== 'giftcertificate')

    return (
        <section className={styles.container}>
            <SubsectionTitle element='h3' title='Order Summary' />
            {hasNotGiftCards && (
                <SectionWrapper>
                    <Address
                        address={shipping_addresses[0]}
                        title='Ships to:'
                    />
                    <Shipments shipments={shipments} />
                    <Returns
                        handleTrackClick={handleTrackClick}
                        hasReturnableItems={returnableItems.length > 0}
                        hasReturns={returnedItems.length > 0}
                        id={order.id}
                    />
                </SectionWrapper>
            )}
            <ItemsTable>
                <TableHeader>
                    <TableHeaderItem title='Item' />
                    <TableHeaderItem style='right' title='Price' />
                    <TableHeaderItem style='right' title='Quantity' />
                    <TableHeaderItem style='right' title='Total' />
                </TableHeader>
                {items.map((item, index) => (
                    <OrderItem
                        currencyCode={currency_code}
                        {...item}
                        key={index}
                    />
                ))}
            </ItemsTable>
        </section>
    )
}

ItemsSummary.propTypes = {
    handleTrackClick: PropTypes.func,
    items: PropTypes.array,
    order: PropTypes.object,
}

import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import {
    ItemsTable,
    TableHeader,
    TableHeaderItem,
} from '@components/account/common'
import { SubsectionTitle } from '@components/common'
import ReturnItem from './ReturnItem'
import styles from './Returns.module.scss'

const Returns = forwardRef(({ currencyCode, returnedItems }, ref) => {
    if (returnedItems.length < 1) {
        return null
    }

    return (
        <section className={styles.container} id='returns' ref={ref}>
            <SubsectionTitle element='h3' title='Returned Items' />
            <p className={styles.caption}>
                Refunds and store credits are issued upon receipt of your items.
                Refunds are issued to your original form of payment and may take
                5 to 10 business days to appear on your statement.
            </p>
            <ItemsTable>
                <TableHeader>
                    <TableHeaderItem title='Item' />
                    <TableHeaderItem style='center' title='Quantity' />
                    <TableHeaderItem title='Total' />
                    <TableHeaderItem title='Outcome' />
                    <TableHeaderItem title='Status' />
                </TableHeader>
                {returnedItems.map((item, index) => (
                    <ReturnItem
                        currencyCode={currencyCode}
                        item={item}
                        key={index}
                    />
                ))}
            </ItemsTable>
        </section>
    )
})

Returns.displayName = 'Returns'

Returns.propTypes = {
    currencyCode: PropTypes.string,
    returnedItems: PropTypes.array,
}

export default Returns

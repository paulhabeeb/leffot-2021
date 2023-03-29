import PropTypes from 'prop-types'

import { Order } from '@components/account'
import GuestWrapper from '../GuestWrapper'

export default function GuestOrder({ order }) {
    return (
        <GuestWrapper title={`Order #${order.id}`}>
            <Order order={order} />
        </GuestWrapper>
    )
}

GuestOrder.propTypes = {
    order: PropTypes.object,
}

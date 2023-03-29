import PropTypes from 'prop-types'

import { CreateReturn } from '@components/account'
import GuestWrapper from '../GuestWrapper'

export default function GuestReturn({ id, order }) {
    return (
        <GuestWrapper title={`Create return for order #${id}`}>
            <CreateReturn id={id} order={order} />
        </GuestWrapper>
    )
}

GuestReturn.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    order: PropTypes.object,
}

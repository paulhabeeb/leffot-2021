import PropTypes from 'prop-types'
import formatOrderDate from '@lib/format-order-date'

import InfoBlip from '../InfoBlip'

export default function Shipments({ shipments }) {
    if (!shipments || Object.keys(shipments).length === 0) return null

    return (
        <>
            {shipments.map((shipment, index) => {
                const { date_created, shipping_method, tracking_number } =
                    shipment

                const shipDate = formatOrderDate(date_created)

                return (
                    <InfoBlip title='Shipments:' key={index}>
                        <div>
                            <div>Shipped {shipDate}</div>
                            <div>{shipping_method}</div>
                            <div>{tracking_number}</div>
                        </div>
                    </InfoBlip>
                )
            })}
        </>
    )
}

Shipments.propTypes = {
    shipments: PropTypes.array,
}

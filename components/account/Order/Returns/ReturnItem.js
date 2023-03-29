import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'

import {
    ItemDetails,
    ItemDetailsWrapper,
    ItemImage,
    ItemWrapper,
    TabularItem,
} from '@components/account/common'

export default function ReturnItem({ currencyCode, item }) {
    const priceToParse =
        item.refund_amount > 0 ? item.refund_amount : item.credit_amount
    const { price } = usePrice({
        amount: parseFloat(priceToParse),
        currencyCode,
    })
    const refundCredit = priceToParse === 0 ? 'N/A' : price

    const extraOptions = [
        { title: 'Quantity', caption: item.quantity },
        { title: 'Total', caption: refundCredit },
        { title: 'Outcome', caption: item.outcome },
        { title: 'Status', caption: item.status },
    ]

    return (
        <ItemWrapper>
            <ItemDetailsWrapper>
                <ItemImage image={item.image} type={item.type} />
                <ItemDetails
                    extraOptions={extraOptions}
                    name={item.name}
                    options={item.product_options}
                />
            </ItemDetailsWrapper>
            <TabularItem style='center'>{item.quantity}</TabularItem>
            <TabularItem>{refundCredit}</TabularItem>
            <TabularItem>{item.outcome}</TabularItem>
            <TabularItem>{item.status}</TabularItem>
        </ItemWrapper>
    )
}

ReturnItem.propTypes = {
    currencyCode: PropTypes.string,
    item: PropTypes.object,
}

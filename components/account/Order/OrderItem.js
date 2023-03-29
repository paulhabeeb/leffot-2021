import PropTypes from 'prop-types'
import usePrice from '@framework/use-price'

import {
    ItemDetails,
    ItemDetailsWrapper,
    ItemImage,
    ItemWrapper,
    TabularItem,
} from '@components/account/common'

export default function OrderItem({
    currencyCode,
    image,
    name,
    pre_order_message,
    price_inc_tax,
    product_options,
    quantity,
    total_inc_tax,
    type,
}) {
    const { price } = usePrice({
        amount: parseFloat(price_inc_tax),
        currencyCode,
    })
    const { price: total } = usePrice({
        amount: parseFloat(total_inc_tax),
        currencyCode,
    })

    const extraOptions = [
        { title: 'Price', caption: price },
        { title: 'Quantity', caption: quantity },
        { title: 'Total', caption: total },
    ]

    return (
        <ItemWrapper>
            <ItemDetailsWrapper>
                <ItemImage image={image} type={type} />
                <ItemDetails
                    extraOptions={extraOptions}
                    name={name}
                    options={product_options}
                    pre_order_message={pre_order_message}
                />
            </ItemDetailsWrapper>
            <TabularItem style='right'>{price}</TabularItem>
            <TabularItem style='right'>&times; {quantity}</TabularItem>
            <TabularItem style='right'>{total}</TabularItem>
        </ItemWrapper>
    )
}

OrderItem.propTypes = {
    currencyCode: PropTypes.string,
    image: PropTypes.object,
    name: PropTypes.string,
    pre_order_message: PropTypes.string,
    price_inc_tax: PropTypes.string,
    product_options: PropTypes.array,
    quantity: PropTypes.number,
    total_inc_tax: PropTypes.string,
    type: PropTypes.string,
}

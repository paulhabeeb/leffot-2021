import { useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

import { TrashCan } from '@components/icons'
import { OverlayLoader } from '@components/placeholders'
import { useCartContext } from '../../CartContext'
import ActionButton from '../ActionButton'
import TotalLine from '../TotalLine'
import TotalValue from '../TotalValue'

export default function RemoveDiscount({
    caption,
    checkoutId,
    code,
    hasDivider,
    title,
    value,
}) {
    const { revalidateCart } = useCartContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleRemove = async () => {
        try {
            setIsLoading(true)
            await axios({
                method: 'DELETE',
                url: `/api/bc-rest/checkouts/${checkoutId}/coupons/${code}`,
            })

            revalidateCart()
            setIsLoading(false)
            setError(null)
        } catch (error) {
            setError(error.detail)
            setIsLoading(false)
            Sentry.captureException(error)
        }
    }

    return (
        <TotalLine hasDivider={hasDivider} title={title}>
            {isLoading && <OverlayLoader />}
            <TotalValue value={value} />
            <ActionButton
                buttonLabel='Remove'
                caption={caption}
                error={error}
                icon={<TrashCan />}
                onClick={handleRemove}
            />
        </TotalLine>
    )
}

RemoveDiscount.defaultProps = {
    hasDivider: false,
}

RemoveDiscount.propTypes = {
    caption: PropTypes.string,
    checkoutId: PropTypes.string,
    code: PropTypes.string,
    hasDivider: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.number,
}

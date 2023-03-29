import { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { urls } from '@lib/data'

import { ErrorBoundary } from '@components/common'

const CreateReturnForm = dynamic(() => import('./CreateReturnForm'))
const CreateReturnSuccess = dynamic(() => import('./CreateReturnSuccess'))
const BackToOrderLink = dynamic(() => import('./BackToOrderLink'))
const Empty = dynamic(() => import('../common/Empty'))

export default function CreateReturn({ id, order }) {
    const [returnData, setReturnData] = useState(null)
    const completeReturn = ({
        email,
        labelBlob,
        labelData,
        labelRequested,
    }) => {
        setReturnData({
            email,
            labelBlob,
            labelData,
            labelRequested,
        })
        window.scrollTo(0, 0)
    }

    const { pathname } = useRouter()
    const base = pathname.includes('account') ? 'account' : 'guest'
    const backLink = urls[base].orders.single.replace(':orderId', id)

    if (returnData) {
        return <CreateReturnSuccess id={id} returnData={returnData} />
    }

    if (order?.products?.length > 0) {
        return (
            <ErrorBoundary>
                <CreateReturnForm
                    cancelAction={backLink}
                    completeReturn={completeReturn}
                    order={order}
                    returnPath={backLink}
                />
            </ErrorBoundary>
        )
    }

    return (
        <>
            <Empty caption='This order contains no products that can be returned. The order may be outside our return window, or all items in the order may already have been returned.' />
            <BackToOrderLink id={id} />
        </>
    )
}

CreateReturn.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.object,
}

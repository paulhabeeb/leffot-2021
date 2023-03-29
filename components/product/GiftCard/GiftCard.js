import { giftCard } from '@lib/data'
import { ProductContextProvider } from '../Context'

import { ErrorBoundary } from '@components/common'
import DetailsList from '../DetailsList'
import Gallery from '../Gallery'
import ProductHeader from '../ProductHeader'
import Wrapper from '../Wrapper'
import PurchaseForm from './PurchaseForm'

export default function GiftCard() {
    const initContext = {
        availableOptions: null,
        defaultImage: giftCard.product.images[0],
        prices: null,
    }

    return (
        <ProductContextProvider init={initContext}>
            <Wrapper
                details={
                    <>
                        {/* <Breadcrumbs
                            categories={giftCard.breadcrumbs}
                            path={giftCard.product.path}
                        /> */}
                        <ProductHeader product={giftCard.product} />
                        <DetailsList {...giftCard.product} />
                        <ErrorBoundary>
                            <PurchaseForm />
                        </ErrorBoundary>
                    </>
                }
                gallery={<Gallery images={giftCard.product.images} />}
                product={giftCard.product}
            />
        </ProductContextProvider>
    )
}

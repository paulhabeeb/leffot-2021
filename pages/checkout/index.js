import { CommerceProvider } from '@framework'

import { Checkout } from '@components/checkout'

export default function CheckoutPage() {
    return (
        <CommerceProvider>
            <Checkout />
        </CommerceProvider>
    )
}

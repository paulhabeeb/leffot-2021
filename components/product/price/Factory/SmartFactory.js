import { useProductContext } from '@components/product'

import Factory from './Factory'

export default function SmartFactory(props) {
    const { prices } = useProductContext()

    if (prices) {
        return <Factory {...props} prices={prices} />
    }

    return null
}

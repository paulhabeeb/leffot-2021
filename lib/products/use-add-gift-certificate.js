import { useCallback } from 'react'
import useCartAddItem from '@framework/commerce/cart/use-add-item'
import { useCommerce } from '@framework'
import useCart from '@framework/cart/use-cart'

const defaultOpts = {
    url: '/api/bigcommerce/cart/gift-certificate',
    method: 'POST',
}
const fetcher = (options, { item, locale, include }, fetch) => {
    // Use a dummy base as we only care about the relative path
    const url = new URL(defaultOpts.url, 'http://a')
    if (include) {
        url.searchParams.set('include', include)
    }

    return fetch({
        ...defaultOpts,
        ...options,
        url: (options?.base || '') + url.pathname + url.search,
        body: { item, locale },
    })
}

export function extendHook(customFetcher) {
    const useAddItem = input => {
        const { mutate } = useCart(input)
        const { locale } = useCommerce()
        const fn = useCartAddItem(defaultOpts, customFetcher)

        return useCallback(
            async function addItem(item) {
                const data = await fn({
                    item,
                    locale,
                    include: input?.include?.join(','),
                })
                await mutate(data, false)
                return data
            },
            [fn, mutate] // eslint-disable-line react-hooks/exhaustive-deps
        )
    }

    useAddItem.extend = extendHook

    return useAddItem
}

export default extendHook(fetcher)

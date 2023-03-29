export default function matchShippingMethods(
    methods,
    selectedId,
    currencyCode
) {
    // We have to check if the selected method is contained in the updated array because
    // sometimes, e.g., if we're switching from a domestic address to an international,
    // certain methods will disappear. And we need at least one of the new methods to
    // be selected.
    const methodsContainsSelectedMethod = methods.some(
        method => method.id === selectedId
    )

    let selectedMethod = null
    let selectedMethodId = null

    const shippingMethods = methods.map((method, index) => {
        const selected =
            selectedId && methodsContainsSelectedMethod
                ? selectedId === method.id
                : index === 0

        const amount = {
            value: method.cost,
            currency_code: currencyCode || 'USD',
        }

        if (selected) {
            selectedMethod = { ...amount }
            selectedMethodId = method.id
        }

        return {
            id: method.id,
            label: method.description,
            type: 'SHIPPING',
            selected,
            amount,
        }
    })

    return { selectedMethod, selectedMethodId, shippingMethods }
}

const queryGraphqlAPI = async query => {
    const response = await fetch(process.env.BIGCOMMERCE_STOREFRONT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
        },
        body: JSON.stringify(query),
    })

    if (response.statusText !== 'OK') {
        throw new Error({
            status: response.status,
            message: response.statusText,
        })
    }

    const data = await response.json()

    return data
}

export default queryGraphqlAPI

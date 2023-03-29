import withRetry from '@lib/retry-api-call'

const queryAPI = async ({ body, method, path }) => {
    const API_URL = `${process.env.BIGCOMMERCE_STORE_API_URL}/${path}`
    const fetchMethod = method || 'GET'

    // GET requests cannot have a body
    const options = {
        method: fetchMethod,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Client': process.env.BIGCOMMERCE_STORE_API_CLIENT_ID,
            'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN,
        },
        body: fetchMethod !== 'GET' ? JSON.stringify(body) : null,
    }

    const response = await withRetry(() => fetch(API_URL, options))

    if (response.ok) {
        if (response.status === 200 || response.status === 201) {
            const jsonData = await response.json()

            return jsonData
        }

        if (response.status === 204) {
            return null
        }

        return {}
    }

    throw {
        message: response.statusText,
        status: response.status,
    }
}

async function handler({ path, req, res }) {
    try {
        const response = await queryAPI({
            path,
            method: req.method,
            body: req.body,
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(error.status).json({
            error: error.message,
        })
    }
}

const bcRestHandler = (module.exports = handler)
bcRestHandler.queryAPI = queryAPI

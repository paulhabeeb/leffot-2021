import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const params = new URLSearchParams(req.query)
    const path = `v3/customers/addresses?${params}`

    return await bcRestHandler({ path, req, res })
}

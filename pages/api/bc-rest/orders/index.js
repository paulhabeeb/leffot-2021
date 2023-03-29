import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const searchParams = new URLSearchParams(req.query)
    const paramsString = searchParams.toString()

    const path = `v2/orders?${paramsString}`

    return await bcRestHandler({ path, req, res })
}

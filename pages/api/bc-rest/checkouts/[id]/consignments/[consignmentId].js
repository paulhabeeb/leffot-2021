import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const { consignmentId, id, include } = req.query
    const params = include ? `?include=${include}` : ''
    const path = `v3/checkouts/${id}/consignments/${consignmentId}${params}`

    return await bcRestHandler({ path, req, res })
}

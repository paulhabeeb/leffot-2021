import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const { id } = req.query
    const path = `v2/countries/${id}/states/count`

    return await bcRestHandler({ path, req, res })
}

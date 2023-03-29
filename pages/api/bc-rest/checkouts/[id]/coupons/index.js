import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const path = `v3/checkouts/${req.query.id}/coupons`

    return await bcRestHandler({ path, req, res })
}

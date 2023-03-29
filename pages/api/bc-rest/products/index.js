import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const path = `v3/catalog/products/${req.body.id}`

    return await bcRestHandler({ path, req, res })
}

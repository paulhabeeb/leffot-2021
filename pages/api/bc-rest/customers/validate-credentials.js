import bcRestHandler from '@lib/api/bc-rest'

export default async function handler(req, res) {
    const path = 'v3/customers/validate-credentials'

    return await bcRestHandler({ path, req, res })
}

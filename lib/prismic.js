import { createClient, getEndpoint } from '@prismicio/client'

const endpoint = getEndpoint('leffot')

const createClientOptions = (req = null, prismicAccessToken = null) => {
    const reqOption = req ? { req } : {}
    const accessTokenOption = prismicAccessToken
        ? { accessToken: prismicAccessToken }
        : {}

    return {
        ...reqOption,
        ...accessTokenOption,
    }
}

export const Client = (req = null) =>
    createClient(
        endpoint,
        createClientOptions(req, process.env.PRISMIC_API_TOKEN)
    )

export default Client

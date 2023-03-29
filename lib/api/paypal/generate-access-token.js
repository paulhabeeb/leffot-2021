import axios from 'axios'
import querystring from 'querystring'

const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_URL } =
    process.env

export default async function generateAccessToken() {
    const auth = Buffer.from(
        NEXT_PUBLIC_PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET
    ).toString('base64')

    const { data } = await axios({
        method: 'post',
        url: `${PAYPAL_URL}/v1/oauth2/token`,
        headers: {
            Authorization: `Basic ${auth}`,
        },
        data: querystring.stringify({ grant_type: 'client_credentials' }),
    })

    return data.access_token
}

import { serialize } from 'cookie'

export function clearCookie({ cookieName, res }) {
    res.setHeader(
        'set-cookie',
        serialize(cookieName, '', {
            httpOnly: true,
            sameSite: true,
            maxAge: -1,
            expires: new Date(0),
            path: '/',
        })
    )
}

export function setCookie({ cookieName, cookieValue, res }) {
    res.setHeader(
        'set-cookie',
        serialize(cookieName, String(cookieValue), {
            httpOnly: true,
            sameSite: true,
            path: '/',
        })
    )
}

import { useState, useEffect } from 'react'

export function useBrowserStatus() {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    return isBrowser
}

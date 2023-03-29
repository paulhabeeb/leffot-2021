import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

const recursiveAPICall = async ({
    countPath,
    getPath,
    handleErr,
    clearErr,
}) => {
    const LIMIT = 250

    try {
        const { data } = await axios.get(countPath)

        const iter = Math.ceil(data.count / LIMIT)
        const ops = []

        for (let i = 0; i < iter; i++) {
            const path = `${getPath}?limit=${LIMIT}&page=${i + 1}`
            ops.push(axios.get(path))
        }

        const response = await Promise.all(ops)

        let recursiveData = []
        response.forEach(res => {
            recursiveData = [...recursiveData, ...res.data]
        })

        clearErr()

        return recursiveData
    } catch (error) {
        handleErr()
        Sentry.captureException(error)
    }
}

export default recursiveAPICall

// function fetchRetry(url, options = {}, retries = 3, backoff = 300) {
//     const retryCodes = [408, 500, 502, 503, 504, 522, 524]
//
//     return fetch(url, options)
//         .then(res => {
//             if (res.ok) return res.json()
//
//             if (retries > 0 && retryCodes.includes(res.status)) {
//                 setTimeout(() => {
//                     return fetchRetry(
//                         url,
//                         options,
//                         retries - 1,
//                         backoff * 2
//                     )
//                 }, backoff)
//             } else {
//                 throw new Error(res)
//             }
//         })
//         .catch(console.error)
// }

/**
 * Wait for the given milliseconds
 * @param {number} milliseconds The given time to wait
 * @returns {Promise} A fulfilled promise after the given time has passed
 */
function waitFor(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Execute a promise and retry with exponential backoff
 * based on the maximum retry attempts it can perform
 * @param {Promise} promise promise to be executed
 * @param {function} onRetry callback executed on every retry
 * @param {number} maxRetries The maximum number of retries to be attempted
 * @returns {Promise} The result of the given promise passed in
 */
export default function withRetry(promise, maxRetries = 4) {
    // Notice that we declare an inner function here so we can encapsulate the
    // retries and don't expose it to the caller. This is also a recursive function.
    async function retryWithBackoff(retries) {
        try {
            // Make sure we don't wait on the first attempt
            if (retries > 0) {
                const timeToWait = 2 ** retries * 100

                await waitFor(timeToWait)
            }

            return await promise()
        } catch (error) {
            if (retries < maxRetries) {
                return retryWithBackoff(retries + 1)
            }

            throw error
        }
    }

    return retryWithBackoff(0)
}

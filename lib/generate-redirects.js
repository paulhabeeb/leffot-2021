// const { queryAPI } = require('./api/bc-rest')
//
// function createRedirectsArray(recursiveData) {
//     return recursiveData.map(redirect => {
//         const source = new URL(redirect.from_path, 'https://leffot.com')
//         const baseRedirect = {
//             source: source.pathname,
//             destination: redirect.to_url
//                 .replace('https://leffot.com', '')
//                 .replace('http://leffot.com', ''),
//             permanent: false,
//         }
//
//         let has = []
//         if (source.search) {
//             const params = new URLSearchParams(source.search)
//
//             for (const [key, value] of params.entries()) {
//                 has.push({
//                     type: 'query',
//                     key,
//                     value,
//                 })
//             }
//
//             return {
//                 ...baseRedirect,
//                 has,
//             }
//         }
//
//         return baseRedirect
//     })
// }
//
// async function getBCRedirects() {
//     try {
//         const LIMIT = 250
//         const basePath = `v3/storefront/redirects?include=to_url&limit=${LIMIT}&page=:page`
//         const { data, meta } = await queryAPI({
//             path: basePath.replace(':page', 1),
//         })
//
//         const bigOpsArray = []
//
//         // We begin on page 2 because we already fetched the first page above
//         for (let i = 1; i < meta.pagination.total_pages; i++) {
//             const path = basePath.replace(':page', i + 1)
//             console.log('path', path)
//             bigOpsArray.push(
//                 queryAPI({
//                     path,
//                 })
//             )
//         }
//
//         // Split the big array of queries into littler arrays of queries so we don't
//         // inundate the BigCommerce API with a thousand calls all at the same time.
//         //         const perChunk = 5
//         //         const smallOpsArray = bigOpsArray.reduce((resultArray, item, index) => {
//         //             const chunkIndex = Math.floor(index / perChunk)
//         //
//         //             // start a new chunk
//         //             if (!resultArray[chunkIndex]) {
//         //                 resultArray[chunkIndex] = []
//         //             }
//         //
//         //             resultArray[chunkIndex].push(item)
//         //
//         //             return resultArray
//         //         }, [])
//
//         const responses = []
//         for (let i = 0; i < bigOpsArray.length; i++) {
//             const response = await bigOpsArray[i]
//             responses.push(response)
//         }
//
//         let recursiveData = [...data]
//         responses.forEach(res => {
//             // response.forEach(res => {
//             recursiveData = [...recursiveData, ...res.data]
//             // })
//         })
//
//         return createRedirectsArray(recursiveData)
//     } catch (err) {
//         console.log('Error generating BC redirects: ', err) // eslint-disable-line no-console
//         return []
//     }
// }

async function generateRedirects() {
    const redirects = [
        {
            source: '/pre-owned/styles/oxfords',
            destination: '/pre-owned?page=1&f.style=Oxfords',
            permanent: true,
        },
        {
            source: '/pre-owned/styles/derbys',
            destination: '/pre-owned?page=1&f.style=Derbys',
            permanent: true,
        },
        {
            source: '/pre-owned/styles/boots',
            destination: '/pre-owned?page=1&f.style=Boots',
            permanent: true,
        },
        {
            source: '/pre-owned/styles/loafers',
            destination: '/pre-owned?page=1&f.style=Loafers',
            permanent: true,
        },
        {
            source: '/pre-owned/styles/monkstraps',
            destination: '/pre-owned?page=1&f.style=Monkstraps',
            permanent: true,
        },
        {
            source: '/pre-owned/styles/moccasins',
            destination: '/pre-owned?page=1&f.style=Moccasins',
            permanent: true,
        },
    ]

    return redirects

    // const bigcommerceRedirects = await getBCRedirects()

    // return [...redirects, ...bigcommerceRedirects]
}

module.exports = generateRedirects

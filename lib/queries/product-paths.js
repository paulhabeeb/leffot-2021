import queryGraphqlAPI from '@lib/api/bc-graphql'

const PRODUCT_PATH_QUERY = /* GraphQL */ `
    query getAllProductPaths($first: Int = 100, $after: String = "") {
        site {
            products(first: $first, after: $after) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        path
                    }
                }
            }
        }
    }
`

const recursiveAPICall = async (endCursor = '') => {
    const { data } = await queryGraphqlAPI({
        query: PRODUCT_PATH_QUERY,
        variables: { first: 50, after: endCursor },
    })

    const { edges } = data.site.products
    const allProducts = [...edges]

    return allProducts

    // Can re-enable this later if you want to statically generate
    // every single product at build time.
    // const { edges, pageInfo } = data.site.products
    // let allProducts = [...edges]
    //
    // if (pageInfo.hasNextPage) {
    //     const moreProducts = await recursiveAPICall(pageInfo.endCursor)
    //     allProducts = [...allProducts, ...moreProducts]
    // }
    //
    // return allProducts
}

const getProductPaths = async path => {
    const products = await recursiveAPICall()

    const paths = []
    products.forEach(product => {
        if (product.node.path.includes(path)) {
            paths.push(`${product.node.path}`)
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

export default getProductPaths

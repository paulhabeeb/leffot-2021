import { urls } from '@lib/data'
import { queryAPI } from '@lib/api/bc-rest'
import { queryAllOfType } from '@lib/queries/prismic'
import linkResolver from '@lib/link-resolver'

async function queryPrismic(type) {
    // We use graphQuery to fetch only the uid, so we don't receive a bunch of
    // unneeded data, like the content of every single page on the site.
    return await queryAllOfType(type, {
        graphQuery: `{
            ${type} {
                uid
            }
        }`,
        orderings: {
            field: `my.${type}.uid`,
            direction: 'asc',
        },
    })
}

async function queryProducts(page = 1) {
    let products = []
    const { data, meta } = await queryAPI({
        path: `v3/catalog/products?is_visible=true&inventory_level:greater=0&limit=250&include_fields=custom_url&page=${page}`,
    })

    products = [...data]

    if (meta.pagination.current_page < meta.pagination.total_pages) {
        const additionalProducts = await queryProducts(page + 1)

        products = [...products, ...additionalProducts]
    }

    return products
}

function generateSiteMap(pages, products) {
    const pageLinks = pages
        .map(
            page => `<url>
                <loc>${`${urls.baseUrl}${linkResolver(page)}`}</loc>
            </url>`
        )
        .join('')
    const productLinks = products
        .map(
            product => `<url>
            <loc>${`${urls.baseUrl}${product.custom_url.url}`}</loc>
        </url>`
        )
        .join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pageLinks}
            ${productLinks}
        </urlset>
    `
}

export default function SiteMap() {
    // getServerSideProps will do the heavy lifting, so this can be empty.
}

export async function getServerSideProps({ res }) {
    const homepage = await queryPrismic('homepage')
    const brands = await queryPrismic('brand')
    const categories = await queryPrismic('category')
    const customMadeBrand = await queryPrismic('custom_made_brand')
    const events = await queryPrismic('event')
    const eventsPage = await queryPrismic('events')
    const blogPosts = await queryPrismic('blog_post')
    const pages = await queryPrismic('page')
    const search = await queryPrismic('search')
    const sizeGuide = await queryPrismic('size_guide')
    const allPages = [
        ...homepage,
        ...brands,
        ...categories,
        ...customMadeBrand,
        ...eventsPage,
        ...events,
        ...pages,
        ...search,
        ...sizeGuide,
        ...blogPosts,
    ]

    const products = await queryProducts()

    const sitemap = generateSiteMap(allPages, products)

    // Send the XML to the browser
    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

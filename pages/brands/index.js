import * as Sentry from '@sentry/nextjs'
import { predicate } from '@prismicio/client'
import { queryAllOfType, queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { Brands } from '@components/brands'

export default function BrandsPage(props) {
    return <Brands {...props} />
}

export async function getStaticProps() {
    try {
        const [[header, footer, siteBanner], page, brands] = await Promise.all([
            getPageLayoutData(),
            queryByUID('brands', 'page'),
            queryAllOfType('brand', {
                orderings: {
                    field: 'my.brand.name',
                    direction: 'asc',
                },
                predicates: [predicate.at('my.brand.enabled', true)],
            }),
        ])

        return {
            props: {
                brands,
                footer,
                header,
                page,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

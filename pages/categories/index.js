import * as Sentry from '@sentry/nextjs'
import { predicate } from '@prismicio/client'
import { queryAllOfType, queryByUID } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { Categories } from '@components/categories'

export default function CategoriesPage(props) {
    return <Categories {...props} />
}

export async function getStaticProps() {
    try {
        const [[header, footer, siteBanner], page, categories] =
            await Promise.all([
                getPageLayoutData(),
                queryByUID('categories', 'page'),
                queryAllOfType('category', {
                    orderings: {
                        field: 'my.category.name',
                        direction: 'asc',
                    },
                    predicates: [
                        predicate.at(
                            'my.category.show_on_categories_page',
                            true
                        ),
                    ],
                }),
            ])

        return {
            props: {
                categories,
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

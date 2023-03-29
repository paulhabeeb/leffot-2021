import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import { SWRConfig } from 'swr'
import { querySingle } from '@lib/queries/prismic'
import getPageLayoutData from '@lib/queries/layout-props'

import { Homepage } from '@components/homepage'
import { Base } from '@components/layout'

export default function Home({ fallback, footer, header, siteBanner }) {
    return (
        <SWRConfig value={{ fallback }}>
            <Base
                banner={siteBanner}
                categories={header.data.body}
                footer={footer.data}
            >
                <Homepage />
            </Base>
        </SWRConfig>
    )
}

Home.propTypes = {
    fallback: PropTypes.object,
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

export async function getStaticProps({ previewData = {} }) {
    try {
        const [[header, footer, siteBanner], { data }] = await Promise.all([
            await getPageLayoutData(),
            await querySingle({
                slug: 'homepage',
                options: {
                    ref: previewData.ref,
                },
            }),
        ])

        return {
            props: {
                fallback: {
                    homepage: data,
                },
                footer,
                header,
                siteBanner,
            },
            revalidate: 120,
        }
    } catch (error) {
        Sentry.captureException(error)

        return { notFound: true }
    }
}

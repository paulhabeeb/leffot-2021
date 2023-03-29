import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { urls } from '@lib/data'

import { ErrorBoundary, SearchError } from '@components/common'
import { Base } from '@components/layout'

export default function PageNotFound({ footer, header, siteBanner }) {
    const title = 'Page Not Found'
    const description =
        'The page you are looking for has moved or no longer exists.'
    const canonical = `${urls.baseUrl}${urls.notFound}`

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                title={title}
                description={description}
                canonical={canonical}
                openGraph={{
                    title,
                }}
            />
            <ErrorBoundary>
                <SearchError caption={description} title={title} />
            </ErrorBoundary>
        </Base>
    )
}

PageNotFound.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    siteBanner: PropTypes.object,
}

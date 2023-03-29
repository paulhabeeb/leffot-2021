import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { urls } from '@lib/data'
import { asText } from '@prismicio/helpers'

import { ErrorBoundary } from '@components/common'
import { Base } from '@components/layout'
import Post from './Post'
import styles from './JournalPost.module.scss'

export default function JournalPost({ footer, header, post, siteBanner }) {
    const metaTitle = `${asText(post.data.title)} - Journal`
    const canonical = `${urls.baseUrl}/journal/${post.uid}`

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo
                canonical={canonical}
                title={metaTitle}
                openGraph={{
                    title: metaTitle,
                    url: canonical,
                }}
            />
            <ErrorBoundary>
                <main id='main' className={styles.container}>
                    <Post post={post} />
                </main>
            </ErrorBoundary>
        </Base>
    )
}

JournalPost.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    post: PropTypes.object,
    siteBanner: PropTypes.object,
}

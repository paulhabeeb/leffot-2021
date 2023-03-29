import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import { urls } from '@lib/data'

import { ErrorBoundary, PageHeader } from '@components/common'
import { Base } from '@components/layout'
import Nav from './Nav'
import Post from './Post'
import styles from './Journal.module.scss'

export default function Journal({ footer, header, posts, siteBanner }) {
    const canonical = `${urls.baseUrl}/journal`

    return (
        <Base
            banner={siteBanner}
            categories={header.data.body}
            footer={footer.data}
        >
            <NextSeo canonical={canonical} title='Journal' />
            <ErrorBoundary>
                <PageHeader title='Journal' />
            </ErrorBoundary>
            <ErrorBoundary>
                <main id='main' className={styles.container}>
                    {posts.results.map((post, index) => (
                        <Post post={post} key={index} />
                    ))}
                    <Nav journal={posts} />
                </main>
            </ErrorBoundary>
        </Base>
    )
}

Journal.propTypes = {
    footer: PropTypes.object,
    header: PropTypes.object,
    posts: PropTypes.object,
    siteBanner: PropTypes.object,
}

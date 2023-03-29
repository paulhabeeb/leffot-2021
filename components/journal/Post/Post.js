import PropTypes from 'prop-types'
import { asDate, asText } from '@prismicio/helpers'

import { ErrorBoundary } from '@components/common'
import { Image as JournalImage, SliceFactory } from '@components/slices/journal'
import Header from './Header'
import styles from './Post.module.scss'

export default function Post({ post }) {
    const { body, date_published, featured_image, title } = post.data

    const hasImageGallery = body.some(slice => {
        const sliceType = slice.type || slice.slice_type

        if (sliceType === 'image_gallery') {
            return true
        }

        return false
    })

    const date = Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }).format(asDate(date_published))

    return (
        <ErrorBoundary>
            <article
                className={styles.post}
                aria-label={`${asText(title)} - ${date}`}
            >
                <Header date={date} post={post} />
                <div className={styles.container}>
                    {featured_image?.url && !hasImageGallery && (
                        <JournalImage image={featured_image} />
                    )}
                    {body.map((slice, index) => (
                        <SliceFactory slice={slice} key={index} />
                    ))}
                </div>
            </article>
        </ErrorBoundary>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
        data: PropTypes.shape({
            body: PropTypes.array,
            date_published: PropTypes.string,
            featured_image: PropTypes.object,
            title: PropTypes.array,
        }),
    }),
}

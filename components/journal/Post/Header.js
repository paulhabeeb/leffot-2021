import PropTypes from 'prop-types'
import Link from 'next/link'
import { PrismicText } from '@prismicio/react'
import linkResolver from '@lib/link-resolver'

import { ErrorBoundary } from '@components/common'
import styles from './Header.module.scss'

export default function Header({ date, post }) {
    const { title } = post.data
    const link = linkResolver(post)

    return (
        <ErrorBoundary>
            <header className={styles.container}>
                <h1 className={styles.title}>
                    <Link href={link} className={styles.titleLink}>
                        <PrismicText field={title} />
                    </Link>
                </h1>
                <time className={styles.dateTime} dateTime={date}>
                    {date}
                </time>
            </header>
        </ErrorBoundary>
    )
}

Header.propTypes = {
    date: PropTypes.string,
    post: PropTypes.object,
}

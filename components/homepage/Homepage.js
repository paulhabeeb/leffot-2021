import { Fragment } from 'react'
import { NextSeo } from 'next-seo'
import usePrismic from '@lib/use-prismic'

import { ErrorBoundary } from '@components/common'
import { LargePromo, SmallPromo } from '@components/slices/homepage'
import styles from './Homepage.module.scss'

export default function Homepage() {
    const { data } = usePrismic('homepage')

    const largePromos = []
    const smallPromos = []

    data.body.forEach((slice, index) => {
        if (slice.slice_type === 'promo') {
            const {
                button_aria_label,
                button_link,
                button_text,
                caption,
                image,
                size,
                title,
                video,
            } = slice.primary

            if (size === 'Large') {
                largePromos.push(
                    <Fragment key={index}>
                        <ErrorBoundary>
                            <LargePromo
                                backgroundColor={slice.primary.background_color}
                                buttonAriaLabel={button_aria_label}
                                buttonLink={button_link}
                                buttonText={button_text}
                                caption={caption}
                                customBackgroundColor={
                                    slice.primary.custom_background_color
                                }
                                image={image}
                                index={index}
                                title={title}
                                video={video}
                            />
                        </ErrorBoundary>
                    </Fragment>
                )
            }
            if (size === 'Small') {
                smallPromos.push(
                    <Fragment key={index}>
                        <ErrorBoundary>
                            <SmallPromo
                                buttonAriaLabel={button_aria_label}
                                buttonLink={button_link}
                                buttonText={button_text}
                                caption={caption}
                                image={image}
                                title={title}
                                video={video}
                            />
                        </ErrorBoundary>
                    </Fragment>
                )
            }
        }
    })

    return (
        <main id='main'>
            <NextSeo description={data.meta_description} />
            {largePromos && <div>{largePromos}</div>}
            {smallPromos && (
                <div className={styles.smallPromos}>{smallPromos}</div>
            )}
        </main>
    )
}

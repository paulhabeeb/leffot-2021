import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import styles from './JumboBleedThruHeader.module.scss'

const BrandTabs = dynamic(() => import('../BrandTabs'))

export default function JumboBleedThruHeader({
    background_color,
    banner_image,
    caption,
    name,
    show_brand_tabs,
    tab,
    tagline,
}) {
    return (
        <>
            <div
                className={styles.wrapper}
                style={{ backgroundColor: background_color }}
                role='banner'
            >
                <div className={styles.flex}>
                    <div className={styles.imageWrapper}>
                        <img
                            alt=''
                            className={styles.image}
                            src={banner_image.url}
                        />
                    </div>
                    <div
                        className={styles.imageBackground}
                        style={{
                            backgroundImage: `url(${banner_image.url})`,
                        }}
                    >
                        <div className={styles.overlay}>
                            <div className={styles.description}>
                                <h1 className={styles.title}>
                                    <PrismicText field={name} />
                                </h1>
                                <p className={styles.tag}>
                                    <PrismicText field={tagline} />
                                </p>
                                {caption && (
                                    <div className={styles.caption}>
                                        <PrismicRichText field={caption} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {show_brand_tabs && (
                    <BrandTabs
                        backgroundColor='transparent'
                        brandName={name}
                        tabs={tab}
                    />
                )}
            </div>
        </>
    )
}

JumboBleedThruHeader.propTypes = {
    background_color: PropTypes.string,
    banner_image: PropTypes.object,
    caption: PropTypes.array,
    name: PropTypes.array,
    show_brand_tabs: PropTypes.bool,
    tab: PropTypes.array,
    tagline: PropTypes.array,
}

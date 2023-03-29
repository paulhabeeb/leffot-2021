import PropTypes from 'prop-types'

import { SliceFactory } from '@components/slices/brands'
import Gallery from './Gallery'
import Header from './Header'
import styles from './CustomMade.module.scss'

export default function CustomMade({ brand, customMade, events, gallery }) {
    const {
        body,
        custom_made_caption,
        custom_made_header_image,
        custom_made_title,
    } = customMade

    return (
        <>
            <main className={styles.main} id='main'>
                <div className={styles.container}>
                    <Header
                        caption={custom_made_caption}
                        image={custom_made_header_image}
                        title={custom_made_title}
                    />
                    <SliceFactory slices={body} events={events} />
                </div>
            </main>
            {gallery?.[0]?.gallery_image && (
                <Gallery gallery={gallery} brandName={brand?.name} />
            )}
        </>
    )
}

CustomMade.propTypes = {
    brand: PropTypes.object,
    customMade: PropTypes.object,
    events: PropTypes.array,
    gallery: PropTypes.array,
}

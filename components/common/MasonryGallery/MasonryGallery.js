import PropTypes from 'prop-types'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import GalleryImage from './GalleryImage'

export default function MasonryGallery({ images }) {
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 551: 2, 801: 3, 1040: 4 }}
        >
            <Masonry gutter='var(--spacing-half)'>
                {images.map((item, index) => (
                    <GalleryImage
                        key={index}
                        image={item.gallery_image}
                        caption={item.caption1}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
    )
}

MasonryGallery.propTypes = {
    images: PropTypes.array,
}

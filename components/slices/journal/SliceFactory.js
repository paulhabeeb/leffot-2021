import PropTypes from 'prop-types'

import { ErrorBoundary } from '@components/common'
import Button from './Button'
import JournalImage from './Image'
import ImageGallery from './ImageGallery'
import Text from './Text'

export default function SliceFactory({ slice }) {
    if (slice.slice_type === 'button') {
        return (
            <ErrorBoundary>
                <Button button={slice.primary.link} />
            </ErrorBoundary>
        )
    }
    if (slice.slice_type === 'image') {
        return (
            <ErrorBoundary>
                <JournalImage
                    image={slice.primary.image}
                    caption={slice.primary.image_caption}
                />
            </ErrorBoundary>
        )
    }
    if (slice.slice_type === 'image_gallery') {
        return (
            <ErrorBoundary>
                <ImageGallery images={slice.items} />
            </ErrorBoundary>
        )
    }
    if (slice.slice_type === 'text') {
        return (
            <ErrorBoundary>
                <Text text={slice.primary.text} />
            </ErrorBoundary>
        )
    }

    return null
}

SliceFactory.propTypes = {
    slice: PropTypes.object,
}

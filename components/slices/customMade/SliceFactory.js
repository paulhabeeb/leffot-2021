import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import { ErrorBoundary } from '@components/common'
import Brands from './Brands'
import Events from './Events'
import FAQ from './FAQ'

export default function SliceFactory({ brands, events, slice }) {
    if (slice.slice_type === 'q_a') {
        return (
            <ErrorBoundary>
                <FAQ
                    image={slice.primary.image}
                    questions={slice.items}
                    title={slice.primary.heading}
                />
            </ErrorBoundary>
        )
    }

    if (slice.slice_type === 'text') {
        const sliceTitle = asText(slice.primary.title1)

        if (sliceTitle === 'Events') {
            return (
                <ErrorBoundary>
                    <Events
                        body={slice.primary.text_body}
                        cards={events}
                        title={slice.primary.title1}
                    />
                </ErrorBoundary>
            )
        }

        if (sliceTitle === 'Brands') {
            return (
                <ErrorBoundary>
                    <Brands
                        body={slice.primary.text_body}
                        cards={brands}
                        title={slice.primary.title1}
                    />
                </ErrorBoundary>
            )
        }
    }

    return null
}

SliceFactory.propTypes = {
    brands: PropTypes.array,
    events: PropTypes.array,
    slice: PropTypes.object,
}

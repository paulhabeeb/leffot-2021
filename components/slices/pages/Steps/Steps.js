import PropTypes from 'prop-types'

import { ErrorBoundary, ToggleSection } from '@components/common'
import MailInGuide from './MailInGuide'

export default function Steps({ slice }) {
    const steps = <MailInGuide steps={slice.items} />

    if (slice.primary.is_accordion) {
        return (
            <ErrorBoundary>
                <ToggleSection
                    buttonId={slice.primary.accordion_button_id}
                    sectionId={slice.primary.accordion_section_id}
                    title={slice.primary.accordion_title}
                >
                    {steps}
                </ToggleSection>
            </ErrorBoundary>
        )
    }

    return <ErrorBoundary>{steps}</ErrorBoundary>
}

Steps.propTypes = {
    slice: PropTypes.object,
}

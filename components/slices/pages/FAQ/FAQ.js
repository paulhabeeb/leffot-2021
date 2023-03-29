import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import { ErrorBoundary } from '@components/common'
import FAQList from './FAQList'
import styles from './FAQ.module.scss'

export default function FAQ({ slice }) {
    const id = asText(slice.primary.heading).replace(' ', '-').toLowerCase()

    return (
        <ErrorBoundary>
            <div className={styles.container} id={id}>
                <h1 className={styles.title}>
                    {asText(slice.primary.heading)}
                </h1>
                <FAQList questions={slice.items} />
            </div>
        </ErrorBoundary>
    )
}

FAQ.propTypes = {
    slice: PropTypes.object,
}

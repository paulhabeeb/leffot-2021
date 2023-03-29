import PropTypes from 'prop-types'

import { ErrorBoundary, RawHTML } from '@components/common'
import styles from './Map.module.scss'

export default function Map({ slice }) {
    return (
        <ErrorBoundary>
            <RawHTML
                className={styles.container}
                code={slice.primary.map[0].text}
            />
        </ErrorBoundary>
    )
}

Map.propTypes = {
    slice: PropTypes.object,
}

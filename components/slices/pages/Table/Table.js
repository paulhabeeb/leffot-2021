import PropTypes from 'prop-types'

import { ErrorBoundary, RawHTML } from '@components/common'
import styles from './Table.module.scss'

export default function Table({ slice }) {
    return (
        <ErrorBoundary>
            <RawHTML
                className={styles.tableWrapper}
                code={slice.primary.table[0].text}
            />
        </ErrorBoundary>
    )
}

Table.propTypes = {
    slice: PropTypes.string,
}

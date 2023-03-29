import PropTypes from 'prop-types'

import { ErrorBoundary } from '@components/common'
import styles from './HeaderContainer.module.scss'

export default function HeaderContainer({ children }) {
    return (
        <section className={styles.container}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </section>
    )
}

HeaderContainer.propTypes = {
    children: PropTypes.node,
}

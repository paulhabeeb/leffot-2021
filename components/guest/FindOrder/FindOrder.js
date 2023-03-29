import PropTypes from 'prop-types'
import { ErrorBoundary } from '@components/common'
import FindOrderForm from './FindOrderForm'
import styles from './FindOrder.module.scss'

export default function FindOrder({ showError }) {
    return (
        <main id='main' className={styles.container}>
            <h1 className={styles.title}>Guest Orders</h1>
            <p className={styles.caption}>
                Enter your email address and order number to view your order,
                start a return, or track a return.
            </p>
            <ErrorBoundary>
                <FindOrderForm showError={showError} />
            </ErrorBoundary>
        </main>
    )
}

FindOrder.propTypes = {
    showError: PropTypes.bool,
}

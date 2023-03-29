import { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './ErrorBoundary.module.scss'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className={styles.errorContainer}>
                    <h2 className={styles.errorTitle}>Something went wrong.</h2>
                    <p className={styles.errorCaption}>
                        Oops! We’re having trouble showing you this content.
                        Please try again later.
                    </p>
                </section>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
}

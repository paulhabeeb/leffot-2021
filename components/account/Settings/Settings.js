import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { Alert, ErrorBoundary } from '@components/common'
import PasswordForm from './PasswordForm'
import SettingsForm from './SettingsForm'
import styles from './Settings.module.scss'

export default function Settings({ customer }) {
    const { query } = useRouter()

    return (
        <ErrorBoundary>
            <div className={styles.container}>
                {query.success && query.success === 'profile' && (
                    <Alert message='Success! Profile updated.' />
                )}
                {query.success && query.success === 'password' && (
                    <Alert message='Success! Password updated.' />
                )}
                <SettingsForm customer={customer} />
                <PasswordForm customer={customer} />
            </div>
        </ErrorBoundary>
    )
}

Settings.propTypes = {
    customer: PropTypes.object,
}

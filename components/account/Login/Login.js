import { useRouter } from 'next/router'

import { Alert, ErrorBoundary } from '@components/common'
import LoginForm from './LoginForm'
import NewCustomer from './NewCustomer'
import styles from './Login.module.scss'

export default function Login() {
    const router = useRouter()
    const passwordWasReset = router?.query?.resetPassword

    return (
        <>
            <main id='main' className={styles.container}>
                <h1 className={styles.title}>Sign In</h1>
                {passwordWasReset && (
                    <Alert
                        message='Your password has been reset. You can now log in to your account.'
                        style='info'
                    />
                )}
                <ErrorBoundary>
                    <LoginForm />
                    <NewCustomer />
                </ErrorBoundary>
            </main>
        </>
    )
}

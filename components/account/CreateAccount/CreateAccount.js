import { ErrorBoundary } from '@components/common'
import CreateAccountForm from './CreateAccountForm'
import styles from './CreateAccount.module.scss'

export default function CreateAccount() {
    return (
        <>
            <main id='main' className={styles.container}>
                <h1 className={styles.title}>New Account</h1>
                <ErrorBoundary>
                    <CreateAccountForm />
                </ErrorBoundary>
            </main>
        </>
    )
}

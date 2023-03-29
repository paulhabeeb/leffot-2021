import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'

import { useRouter } from 'next/router'
import useLogout from '@framework/use-logout'
import { urls } from '@lib/data'

import { ErrorBoundary } from '@components/common'
import { Base } from '@components/layout'
import AccountNav from '../Nav'
import AccountPageTitle from '../AccountPageTitle'
import styles from './AccountBody.module.scss'

function Logout() {
    const router = useRouter()
    const logout = useLogout()

    const onClick = async () => {
        await logout()
        router.push(urls.auth.login)
    }

    return (
        <p className={styles.logout}>
            Not you? <button onClick={onClick}>Sign out</button>.
        </p>
    )
}

export default function AccountBody({
    banner,
    customer,
    children,
    footer,
    header,
    title,
}) {
    return (
        <>
            <NextSeo title={`${title} - Account`} />
            <Base
                banner={banner.data}
                categories={header.data.body}
                footer={footer.data}
            >
                <main className={styles.container} id='main'>
                    <h1 className={styles.title}>Account</h1>
                    <p className={styles.caption}>
                        Welcome, {customer.firstName}.
                    </p>
                    <Logout />
                    <div className={styles.bodyWrapper}>
                        <ErrorBoundary>
                            <AccountNav />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <section className={styles.sectionContainer}>
                                <AccountPageTitle title={title} />
                                {children}
                            </section>
                        </ErrorBoundary>
                    </div>
                </main>
            </Base>
        </>
    )
}

AccountBody.propTypes = {
    banner: PropTypes.object,
    customer: PropTypes.object,
    children: PropTypes.node,
    footer: PropTypes.object,
    header: PropTypes.object,
    title: PropTypes.string,
}

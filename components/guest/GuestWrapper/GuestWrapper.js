import PropTypes from 'prop-types'

import { AccountPageTitle } from '@components/account/common'
import styles from './GuestWrapper.module.scss'

export default function GuestWrapper({ children, title }) {
    return (
        <main id='main' className={styles.container}>
            <AccountPageTitle element='h1' title={title} />
            {children}
        </main>
    )
}

GuestWrapper.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}

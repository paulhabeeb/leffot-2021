import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { urls } from '@lib/data'

import styles from './BackToOrderLink.module.scss'

export default function BackToOrderLink({ id }) {
    const { pathname } = useRouter()
    const base = pathname.includes('account') ? 'account' : 'guest'
    const backLink = urls[base].orders.single.replace(':orderId', id)

    return (
        <Link href={backLink} className={styles.button}>
            Back to order
        </Link>
    )
}

BackToOrderLink.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

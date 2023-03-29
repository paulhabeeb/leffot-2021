import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { urls } from '@lib/data'

import InfoBlip from '../InfoBlip'
import styles from './Returns.module.scss'

export default function Returns({
    handleTrackClick,
    hasReturnableItems,
    hasReturns,
    id,
}) {
    const { pathname } = useRouter()
    const base = pathname.includes('account') ? 'account' : 'guest'
    const returnURL = urls[base].orders.create_return.replace(':orderId', id)

    return (
        <InfoBlip title='Returns:'>
            <ul className={styles.grid}>
                <li className={styles.gridItem}>
                    {hasReturnableItems ? (
                        <Link href={returnURL} className={styles.start}>
                            Start a return
                        </Link>
                    ) : (
                        'This order has no items eligible for return.'
                    )}
                </li>
                {hasReturns && (
                    <li className={styles.gridItem}>
                        <a
                            href='#returns'
                            onClick={handleTrackClick}
                            className={styles.track}
                        >
                            Track my returns
                        </a>
                    </li>
                )}
            </ul>
        </InfoBlip>
    )
}

Returns.propTypes = {
    handleTrackClick: PropTypes.func,
    hasReturnableItems: PropTypes.bool,
    hasReturns: PropTypes.bool,
    id: PropTypes.number,
}

import PropTypes from 'prop-types'
import Link from 'next/link'
import linkResolver from '@lib/link-resolver'

import styles from './Subcategory.module.scss'

export default function Subcategory({
    subcategory_enabled,
    subcategory_label,
    subcategory_link,
}) {
    if (subcategory_enabled) {
        const link = linkResolver(subcategory_link)

        return (
            <li className={styles.category}>
                <Link href={link} className={styles.link}>
                    {subcategory_label}
                </Link>
            </li>
        )
    }

    return null
}

Subcategory.propTypes = {
    subcategory_enabled: PropTypes.bool,
    subcategory_label: PropTypes.string,
    subcategory_link: PropTypes.object,
}

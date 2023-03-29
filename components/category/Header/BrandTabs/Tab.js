import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { trailingSlash, urlQuery } from '@lib/regex'

import { asText } from '@prismicio/helpers'
import styles from './Tab.module.scss'

export default function Tab({ brandName, label, link }) {
    const ariaLabel = `${asText(brandName)} ${label}`

    const { asPath } = useRouter()
    const currentPath = asPath.replace(trailingSlash, '').replace(urlQuery, '')
    const linkPath = link.replace(trailingSlash, '')

    const activeClassName = cn({
        [styles.isActive]: currentPath === linkPath,
    })

    return (
        <li className={styles.tab}>
            <Link
                href={link}
                aria-label={ariaLabel}
                className={activeClassName}
                title={label}
            >
                {label}
            </Link>
        </li>
    )
}

Tab.propTypes = {
    brandName: PropTypes.array,
    label: PropTypes.string,
    link: PropTypes.string,
}

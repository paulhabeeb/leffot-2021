import PropTypes from 'prop-types'
import Link from 'next/link'
import { PrismicText } from '@prismicio/react'
import linkResolver from '@lib/link-resolver'
import { baseUrl } from '@lib/regex'

import cn from 'classnames'
import styles from './PromoButton.module.scss'

export default function PromoButton({
    ariaLabel,
    buttonText,
    isDark,
    isLargePromo,
    link,
}) {
    const className = cn(styles.button, {
        [styles.dark]: isDark,
        [styles.largePromo]: isLargePromo,
    })

    const isLeffotLink = baseUrl.test(link.url)
    const linkProps = {
        target: link?.target,
        rel: link.target && 'noopener',
    }

    if (link.link_type === 'Web' && !isLeffotLink) {
        return (
            <a className={className} href={link.url} {...linkProps}>
                <PrismicText field={buttonText} />
            </a>
        )
    }

    return (
        <Link
            href={linkResolver(link)}
            {...linkProps}
            className={className}
            aria-label={ariaLabel}
        >
            <PrismicText field={buttonText} />
        </Link>
    )
}

PromoButton.defaultProps = {
    isDark: false,
    isLarge: false,
}

PromoButton.propTypes = {
    ariaLabel: PropTypes.string,
    buttonText: PropTypes.array,
    isDark: PropTypes.bool,
    isLargePromo: PropTypes.bool,
    link: PropTypes.object,
    title: PropTypes.array,
}

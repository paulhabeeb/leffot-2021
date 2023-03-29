import PropTypes from 'prop-types'
import Link from 'next/link'
import { PrismicRichText } from '@prismicio/react'
import linkResolver from '@lib/link-resolver'

import cn from 'classnames'
import styles from './Footer.module.scss'
import FooterCol from './FooterCol'

function FooterLink({ isSocial, link, title }) {
    const url = linkResolver(link)

    if (isSocial) {
        const { default: Icon } = require(`@components/icons/${title}`)

        return (
            <li className={styles.footerLinkSocial}>
                <a href={url} target='_blank' rel='noopener noreferrer'>
                    <span className='visuallyHidden'>Follow us on {title}</span>
                    <span className={styles.socialIcon}>
                        <Icon />
                    </span>
                </a>
            </li>
        )
    }

    return (
        <li>
            <Link href={url}>{title}</Link>
        </li>
    )
}

FooterLink.propTypes = {
    isSocial: PropTypes.bool,
    link: PropTypes.object,
    title: PropTypes.string,
}

function FooterLinkList({ isSocial, links }) {
    return (
        <ul className={cn({ [styles.footerColSocial]: isSocial })}>
            {links.map((link, index) => {
                if (link.link !== null) {
                    return (
                        <FooterLink
                            isSocial={isSocial}
                            link={link.link}
                            title={link.link_label}
                            key={index}
                        />
                    )
                }

                return null
            })}
        </ul>
    )
}

FooterLinkList.propTypes = {
    isSocial: PropTypes.bool,
    links: PropTypes.array,
}

export default function FooterLinkSection({
    description,
    isSocial,
    links,
    title,
}) {
    return (
        <FooterCol>
            <h2 className={styles.footerColTitle}>{title}</h2>
            {description && <PrismicRichText field={description} />}
            {links && <FooterLinkList isSocial={isSocial} links={links} />}
        </FooterCol>
    )
}

FooterLinkSection.propTypes = {
    description: PropTypes.array,
    isSocial: PropTypes.bool,
    links: PropTypes.array,
    title: PropTypes.string,
}

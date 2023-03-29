import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import linkResolver from '@lib/link-resolver'
import { baseUrl, trailingSlash, urlQuery } from '@lib/regex'
import Link from 'next/link'

import cn from 'classnames'
import s from './MenuItemLink.module.scss'

const MenuItemLink = forwardRef(
    (
        { children, hasUnderline, isTopLevel, name, onClick, styles, url },
        ref
    ) => {
        const { asPath } = useRouter()
        const rawLink = url !== null ? linkResolver(url, isTopLevel) : '/'
        const link =
            rawLink !== '/'
                ? rawLink.replace(baseUrl, '').replace(trailingSlash, '')
                : '/'
        const currentPath = asPath
            .replace(trailingSlash, '')
            .replace(urlQuery, '')

        const pathRegEx = new RegExp(link)
        let isActive =
            currentPath === link || (isTopLevel && pathRegEx.test(currentPath))

        if (currentPath.includes('pre-owned/brands/') && name === 'Brands') {
            isActive = false
        }

        const baseStyles = styles || s.menuItemLink
        const className = cn(baseStyles, {
            [s.menuItemSaleLink]: name === 'Sale',
            [s.isActive]: isActive,
            [s.hasUnderline]: hasUnderline,
        })

        return (
            <Link href={link} className={className} onClick={onClick} ref={ref}>
                {children}
            </Link>
        )
    }
)

export default MenuItemLink

MenuItemLink.displayName = 'MenuItemLink'

MenuItemLink.propTypes = {
    children: PropTypes.node,
    hasUnderline: PropTypes.bool,
    isTopLevel: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func,
    styles: PropTypes.string,
    url: PropTypes.object,
}

MenuItemLink.defaultProps = {
    hasUnderline: false,
    isTopLevel: false,
}

import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useOutsideAlerter from '@lib/use-outside-alerter'

import cn from 'classnames'
import styles from './ParentItem.module.scss'

import { ChevronDown } from '@components/icons'
import MenuItemLink from '../MenuItemLink'
import MenuListItem from '../MenuListItem'
import ChildrenFactory from './ChildrenFactory'

export default function ParentItem({ hideMenu, isTopLevel, item }) {
    const [submenuIsOpen, updateSubmenuIsOpen] = useState(false)
    const wrapperRef = useRef(null)
    const onDocumentClick = () => {
        updateSubmenuIsOpen(false)
    }
    useOutsideAlerter(wrapperRef, onDocumentClick)

    const onMenuClick = e => {
        e.preventDefault()
        updateSubmenuIsOpen(!submenuIsOpen)
    }

    return (
        <MenuListItem>
            <MenuItemLink
                isTopLevel={isTopLevel}
                name={item.link_label}
                onClick={onMenuClick}
                ref={wrapperRef}
                url={item.link}
            >
                <span className='linkName'>{item.link_label}</span>
                <ChevronDown
                    className={cn(styles.menuItemChevron, {
                        [styles.isOpen]: submenuIsOpen,
                    })}
                />
            </MenuItemLink>
            <ChildrenFactory
                dropdownMenu={item.dropdown_menu}
                hideMenu={hideMenu}
                isTopLevel={isTopLevel}
                item={item}
                submenuIsOpen={submenuIsOpen}
            />
        </MenuListItem>
    )
}

ParentItem.propTypes = {
    hideMenu: PropTypes.func,
    isTopLevel: PropTypes.bool,
    item: PropTypes.object,
}

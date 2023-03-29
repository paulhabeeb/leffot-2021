import PropTypes from 'prop-types'
import Categories from '../Categories'
import Dropdown from '../Dropdown'
import MegaMenuWithSections from '../MegaMenuWithSections'

export default function ChildrenFactory({
    dropdownMenu,
    hideMenu,
    item,
    submenuIsOpen,
}) {
    const parentName = item.link_label
    const parentUrl = item.link

    if (dropdownMenu.data.menu_enabled !== true) {
        return null
    }

    if (
        dropdownMenu.type === 'mega_menu' &&
        dropdownMenu.data.style === 'Images'
    ) {
        return (
            <Categories
                dropdownMenu={dropdownMenu.data.body}
                hideMenu={hideMenu}
                parentName={parentName}
                parentUrl={parentUrl}
                submenuIsOpen={submenuIsOpen}
            />
        )
    }

    if (dropdownMenu.type === 'mm_secs') {
        return (
            <MegaMenuWithSections
                description={dropdownMenu.data.description}
                dropdownMenu={dropdownMenu.data.body}
                hideMenu={hideMenu}
                parentName={parentName}
                parentUrl={parentUrl}
                submenuIsOpen={submenuIsOpen}
            />
        )
    }

    return (
        <Dropdown
            dropdownMenu={dropdownMenu.data.body}
            hideMenu={hideMenu}
            parentName={parentName}
            parentUrl={parentUrl}
            submenuIsOpen={submenuIsOpen}
        />
    )
}

ChildrenFactory.propTypes = {
    dropdownMenu: PropTypes.object,
    hideMenu: PropTypes.func,
    item: PropTypes.object,
    submenuIsOpen: PropTypes.bool,
}

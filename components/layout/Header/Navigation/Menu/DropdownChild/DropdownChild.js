import PropTypes from 'prop-types'

import MenuItemLink from '../MenuItemLink'
import DropdownListItem from './DropdownListItem'

export default function DropdownChild({
    hasUnderline,
    hideMenu,
    isHeader,
    name,
    url,
}) {
    return (
        <DropdownListItem isHeader={isHeader}>
            <MenuItemLink
                hasUnderline={hasUnderline}
                name={name}
                onClick={hideMenu}
                url={url}
            >
                <span className='linkName'>{name}</span>
            </MenuItemLink>
        </DropdownListItem>
    )
}

DropdownChild.propTypes = {
    hasUnderline: PropTypes.bool,
    hideMenu: PropTypes.func,
    isHeader: PropTypes.bool,
    name: PropTypes.string,
    url: PropTypes.object,
}

DropdownChild.defaultProps = {
    hasUnderline: true,
    isHeader: false,
}

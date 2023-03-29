import PropTypes from 'prop-types'
import MenuItemLink from '../MenuItemLink'
import MenuListItem from '../MenuListItem'

export default function SingleItem({ hideMenu, isTopLevel, name, url }) {
    return (
        <MenuListItem>
            <MenuItemLink
                isTopLevel={isTopLevel}
                name={name}
                onClick={hideMenu}
                url={url}
            >
                <span className='linkName'>{name}</span>
            </MenuItemLink>
        </MenuListItem>
    )
}

SingleItem.propTypes = {
    hideMenu: PropTypes.func,
    isTopLevel: PropTypes.bool,
    name: PropTypes.string,
    url: PropTypes.object,
}

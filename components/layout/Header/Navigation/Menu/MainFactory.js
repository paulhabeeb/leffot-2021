import PropTypes from 'prop-types'
import ParentItem from './ParentItem'
import SingleItem from './SingleItem'

export default function MainFactory({ hideMenu, item }) {
    if (item.link_enabled !== true) {
        return null
    }

    if (item.dropdown_menu?.data) {
        return <ParentItem hideMenu={hideMenu} isTopLevel={true} item={item} />
    }

    return (
        <SingleItem
            hideMenu={hideMenu}
            isTopLevel={true}
            name={item.link_label}
            url={item.link}
        />
    )
}

MainFactory.propTypes = {
    hideMenu: PropTypes.func,
    item: PropTypes.object,
}

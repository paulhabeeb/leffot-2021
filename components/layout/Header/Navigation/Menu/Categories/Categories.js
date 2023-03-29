import PropTypes from 'prop-types'

import DropdownChild from '../DropdownChild'
import MegaMenuWrapper from '../MegaMenuWrapper'
import CategoriesChild from './CategoriesChild'
import styles from './Categories.module.scss'

export default function Categories({
    dropdownMenu,
    hideMenu,
    parentName,
    parentUrl,
    submenuIsOpen,
}) {
    return (
        <MegaMenuWrapper isOpen={submenuIsOpen}>
            <div className={styles.viewAllCats}>
                <DropdownChild
                    hasUnderline={false}
                    hideMenu={hideMenu}
                    isHeader={true}
                    name={`View All ${parentName}`}
                    url={parentUrl}
                />
            </div>
            {dropdownMenu.map(child => {
                if (child.primary.link_enabled) {
                    return (
                        <CategoriesChild
                            description={child.primary.link_desc}
                            hideMenu={hideMenu}
                            image={child.primary.link_image}
                            name={child.primary.link_label}
                            url={child.primary.link}
                            key={child.primary.link.uid}
                        />
                    )
                }

                return null
            })}
        </MegaMenuWrapper>
    )
}

Categories.propTypes = {
    dropdownMenu: PropTypes.array,
    hideMenu: PropTypes.func,
    parentName: PropTypes.string,
    parentUrl: PropTypes.object,
    submenuIsOpen: PropTypes.bool,
}

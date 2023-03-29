import PropTypes from 'prop-types'
import cn from 'classnames'

import DropdownChild from '../DropdownChild'
import styles from './Dropdown.module.scss'

export default function Dropdown({
    dropdownMenu,
    hideMenu,
    parentName,
    parentUrl,
    submenuIsOpen,
}) {
    return (
        <div
            className={cn(styles.dropdown, {
                [styles['is-open']]: submenuIsOpen,
            })}
            aria-hidden={!submenuIsOpen}
        >
            <ul className={styles.dropdownList}>
                <DropdownChild
                    hasUnderline={false}
                    hideMenu={hideMenu}
                    isHeader={true}
                    name={`View All ${parentName}`}
                    url={parentUrl}
                />
                {dropdownMenu.map((child, index) => {
                    if (child.primary.link_enabled) {
                        return (
                            <DropdownChild
                                hideMenu={hideMenu}
                                name={child.primary.link_label}
                                url={child.primary.link}
                                key={index}
                            />
                        )
                    }

                    return null
                })}
            </ul>
        </div>
    )
}

Dropdown.propTypes = {
    dropdownMenu: PropTypes.array,
    hideMenu: PropTypes.func,
    parentName: PropTypes.string,
    parentUrl: PropTypes.object,
    submenuIsOpen: PropTypes.bool,
}

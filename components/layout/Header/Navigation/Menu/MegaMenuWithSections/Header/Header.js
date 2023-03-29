import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import MenuItemLink from '../../MenuItemLink'
import styles from './Header.module.scss'

export default function Header({
    description,
    hideMenu,
    parentName,
    parentUrl,
}) {
    return (
        <li className={styles.mmSecsHeader}>
            <div className={styles.mmSecsTitle}>
                <MenuItemLink
                    name={parentName}
                    onClick={hideMenu}
                    styles={styles.mmSecsTitleLink}
                    url={parentUrl}
                >
                    <span className='linkName'>{parentName}</span>
                </MenuItemLink>
                <p className={styles.mmSecsHeaderDescription}>
                    {asText(description)}
                </p>
            </div>
            <MenuItemLink
                name={parentName}
                onClick={hideMenu}
                styles={styles.mmSecsHeaderViewAll}
                url={parentUrl}
            >
                <span className='linkName'>View All {parentName}</span>
            </MenuItemLink>
        </li>
    )
}

Header.propTypes = {
    description: PropTypes.array,
    hideMenu: PropTypes.func,
    parentName: PropTypes.string,
    parentUrl: PropTypes.object,
}

import PropTypes from 'prop-types'

import styles from './Menu.module.scss'
import MainFactory from './MainFactory'

export default function Menu({ categories, hideMenu }) {
    return (
        <ul className={styles.navMenu}>
            {categories.map((category, index) => (
                <MainFactory
                    item={category.primary}
                    hideMenu={hideMenu}
                    key={index}
                />
            ))}
        </ul>
    )
}

Menu.propTypes = {
    categories: PropTypes.array,
    hideMenu: PropTypes.func,
}

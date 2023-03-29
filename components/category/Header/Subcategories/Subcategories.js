import PropTypes from 'prop-types'

import Subcategory from './Subcategory'
import styles from './Subcategories.module.scss'

export default function Subcategories({ subcategories }) {
    if (subcategories.length < 1) return null

    return (
        <div className={styles.container}>
            <nav className={styles.nav} aria-label='Subcategories'>
                <h3 className={styles.title}>Subcategories</h3>
                <ul className={styles.list}>
                    {subcategories.map((subcategory, index) => (
                        <Subcategory {...subcategory} key={index} />
                    ))}
                </ul>
            </nav>
        </div>
    )
}

Subcategories.propTypes = {
    subcategories: PropTypes.array,
}

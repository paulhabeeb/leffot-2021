import PropTypes from 'prop-types'
import cn from 'classnames'

import Tab from './Tab'
import styles from './BrandTabs.module.scss'

export default function BrandTabs({ backgroundColor, brandName, tabs }) {
    const wrapperClass = cn(styles.wrapper, {
        [styles.transparentBackground]: backgroundColor === 'transparent',
    })

    return (
        <nav className={wrapperClass} aria-label='Brand tabs'>
            <ul className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <Tab
                        brandName={brandName}
                        label={tab.tab_label}
                        link={tab.tab_url}
                        key={index}
                    />
                ))}
            </ul>
        </nav>
    )
}

BrandTabs.propTypes = {
    backgroundColor: PropTypes.string,
    brandName: PropTypes.array,
    tabs: PropTypes.array,
}

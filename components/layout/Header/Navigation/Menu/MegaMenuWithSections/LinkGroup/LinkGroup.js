import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './LinkGroup.module.scss'
import DropdownChild from '../../DropdownChild'

export default function LinkGroup({ cols, hideMenu, links, title }) {
    const ulClassName = cn(styles.list, {
        [styles.twoCols]: cols === 2,
        [styles.threeCols]: cols === 3,
        [styles.fourCols]: cols === 4,
    })

    return (
        <li className={styles.wrapper}>
            <span className={styles.listTitle}>{title}</span>
            <ul className={ulClassName}>
                {links.map((item, index) => {
                    if (item.link_enabled) {
                        return (
                            <DropdownChild
                                hideMenu={hideMenu}
                                name={item.link_label}
                                url={item.link}
                                key={index}
                            />
                        )
                    }

                    return null
                })}
            </ul>
        </li>
    )
}

LinkGroup.propTypes = {
    cols: PropTypes.number,
    hideMenu: PropTypes.func,
    links: PropTypes.array,
    title: PropTypes.string,
}

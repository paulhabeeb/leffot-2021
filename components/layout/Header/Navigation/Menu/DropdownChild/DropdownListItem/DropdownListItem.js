import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './DropdownListItem.module.scss'

export default function DropdownListItem({ children, isHeader }) {
    const className = cn({
        [styles.dropdownListItem]: !isHeader,
        [styles.dropdownListItemHeader]: isHeader,
    })

    return <li className={className}>{children}</li>
}

DropdownListItem.propTypes = {
    children: PropTypes.node,
    isHeader: PropTypes.bool,
}

DropdownListItem.defaultProps = {
    isHeader: false,
}

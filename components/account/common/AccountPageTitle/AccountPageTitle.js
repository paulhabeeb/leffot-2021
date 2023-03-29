import PropTypes from 'prop-types'
import styles from './AccountPageTitle.module.scss'

export default function AccountPageTitle({ element, title }) {
    const ElementType = element

    return <ElementType className={styles.title}>{title}</ElementType>
}

AccountPageTitle.defaultProps = {
    element: 'h2',
}

AccountPageTitle.propTypes = {
    element: PropTypes.string,
    title: PropTypes.string,
}

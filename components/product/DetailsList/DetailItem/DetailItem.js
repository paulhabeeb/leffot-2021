import PropTypes from 'prop-types'
import styles from './DetailItem.module.scss'

export default function DetailItem({ children, item }) {
    let value = item.value

    // We do it this way instead of using a ternary so the default, if the value
    // isn't Yes or No, remains the same
    if (item.name === 'Shoe trees') {
        if (item.value === 'Yes') value = 'Shoe trees included'
        if (item.value === 'No') value = 'Shoe trees are not included'
    }

    let content = value
    if (typeof value === 'string') {
        content = <span dangerouslySetInnerHTML={{ __html: value }} />
    }

    return (
        <div>
            <div className={styles.title}>{item.name}</div>
            <div className={styles.content}>{content}</div>
            {children}
        </div>
    )
}

DetailItem.propTypes = {
    children: PropTypes.node,
    item: PropTypes.object,
}

import PropTypes from 'prop-types'
import styles from './Callout.module.scss'

export default function Callout({ description, title }) {
    let content = description
    if (typeof description === 'string') {
        content = <div dangerouslySetInnerHTML={{ __html: description }} />
    }

    return (
        <div className={styles.container}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {content}
        </div>
    )
}

Callout.propTypes = {
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.node,
    ]),
    title: PropTypes.string,
}

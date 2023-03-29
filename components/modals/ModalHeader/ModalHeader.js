import PropTypes from 'prop-types'

import styles from './ModalHeader.module.scss'

export default function ModalHeader({ body, title }) {
    return (
        <header aria-label={title}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.caption}>{body}</p>
        </header>
    )
}

ModalHeader.propTypes = {
    body: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
}

import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './ErrorMessage.module.scss'

export default function ErrorMessage({ className, message }) {
    return <div className={cn(styles.errors, className)}>{message}</div>
}

ErrorMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
}

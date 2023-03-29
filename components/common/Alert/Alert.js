import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './Alert.module.scss'

export default function Alert({ message, style }) {
    const wrapperClass = cn(styles.container, {
        [styles.info]: style === 'info',
        [styles.error]: style === 'error',
    })

    return (
        <div className={wrapperClass}>
            {style === 'error' && (
                <div className={styles.icon}>
                    <icon glyph='ic-error' className='icon' aria-hidden='true'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                        >
                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'></path>
                        </svg>
                    </icon>
                </div>
            )}

            <p className={styles.message}>
                <span>{message}</span>
            </p>
        </div>
    )
}

Alert.defaultProps = {
    style: 'info',
}

Alert.propTypes = {
    message: PropTypes.string,
    style: PropTypes.string,
}

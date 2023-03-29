import PropTypes from 'prop-types'
import styles from './CircleLoader.module.scss'

export default function CircleLoader({ fill, size }) {
    const inlineStyles = {
        borderColor: fill,
        height: `${size}px`,
        width: `${size}px`,
    }

    return (
        <div className={styles.container}>
            <span className={styles.loader} style={inlineStyles} />
        </div>
    )
}

CircleLoader.propTypes = {
    fill: PropTypes.string,
    size: PropTypes.number,
}

CircleLoader.defaultProps = {
    fill: 'var(--color-medium-grey)',
    size: 26,
}

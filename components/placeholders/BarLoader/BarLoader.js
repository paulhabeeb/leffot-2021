import PropTypes from 'prop-types'
import styles from './BarLoader.module.scss'

export default function BarLoader({ fill }) {
    const inlineContainerStyles = {
        backgroundColor: 'var(--color-light-grey)',
    }

    const inlineBarStyles = {
        backgroundColor: fill,
    }

    return (
        <span className={styles.container} style={inlineContainerStyles}>
            <span className={styles.bar1} style={inlineBarStyles} />
            <span className={styles.bar2} style={inlineBarStyles} />
        </span>
    )
}

BarLoader.defaultProps = {
    fill: 'var(--color-medium-grey)',
}

BarLoader.propTypes = {
    fill: PropTypes.string,
}

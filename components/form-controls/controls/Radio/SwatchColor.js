import PropTypes from 'prop-types'
import styles from './SwatchColor.module.scss'

export default function SwatchColor({ hues }) {
    const colorSwatches = []
    hues.forEach((color, index) => {
        colorSwatches.push(
            <span
                className={styles.swatch}
                style={{ backgroundColor: color }}
                key={index}
            />
        )
    })

    return <div className={styles.container}>{colorSwatches}</div>
}

SwatchColor.propTypes = {
    hues: PropTypes.array,
}

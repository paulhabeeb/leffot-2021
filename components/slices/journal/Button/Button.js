import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import styles from './Button.module.scss'

export default function Button({ button }) {
    return (
        <div className={styles.button}>
            <PrismicRichText field={button} />
        </div>
    )
}

Button.propTypes = {
    button: PropTypes.object,
}

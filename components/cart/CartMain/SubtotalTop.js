import PropTypes from 'prop-types'

import styles from './SubtotalTop.module.scss'

export default function SubtotalTop({ qty, subtotal }) {
    return (
        <div className={styles.subtotalTop}>
            <span>
                Subtotal ({qty} {qty === 1 ? 'item' : 'items'}):&nbsp;
            </span>
            <span className={styles.subtotalFigures}>{subtotal}</span>
        </div>
    )
}

SubtotalTop.propTypes = {
    qty: PropTypes.number,
    subtotal: PropTypes.string,
}

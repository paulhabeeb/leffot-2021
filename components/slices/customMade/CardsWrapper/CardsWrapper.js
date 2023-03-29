import PropTypes from 'prop-types'

import styles from './CardsWrapper.module.scss'

export default function CardsWrapper({ children }) {
    return <ul className={styles.cards}>{children}</ul>
}

CardsWrapper.propTypes = {
    children: PropTypes.node,
}

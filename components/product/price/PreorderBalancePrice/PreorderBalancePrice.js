import PropTypes from 'prop-types'
import styles from './PreorderBalancePrice.module.scss'

export default function PreorderBalancePrice({ balance, deposit, fullPrice }) {
    return (
        <dl className={styles.priceBox}>
            <div className={styles.price}>
                <dt>Full price</dt>
                <dd>{fullPrice}</dd>
            </div>
            <div className={styles.price}>
                <dt>Deposit</dt>
                <dd>&mdash; ${deposit}</dd>
            </div>
            <div className={styles.total}>
                <dt>Balance</dt>
                <dd>{balance}</dd>
            </div>
        </dl>
    )
}

PreorderBalancePrice.propTypes = {
    balance: PropTypes.string,
    deposit: PropTypes.string,
    fullPrice: PropTypes.string,
}

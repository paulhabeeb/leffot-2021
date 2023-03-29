import PropTypes from 'prop-types'
import { SearchForm } from '@components/search'
import styles from './OrderConfirmation.module.scss'

export default function OrderConfirmation({ orderNumber }) {
    return (
        <main id='main' className={styles.container}>
            <h1 className={styles.title}>Thank You</h1>
            <p>Thank you for your order! Your order number is {orderNumber}.</p>
            <p>
                If you purchased physical items, we are gathering them and will
                ship them soon. You will receive shipping confirmation by email.
                If you placed a pre-order, we will contact you when your item is
                ready.
            </p>

            <h2 className={styles.subtitle}>
                Forgot something? Need assistance with your order?
            </h2>
            <p>
                We’re happy to assist you. Send us an email at{' '}
                <a href='mailto:info@leffot.com'>info@leffot.com</a>, or call us
                at <a href='tel:12129894577'>(212) 989-4577</a>.
            </p>

            <div className={styles.searchForm}>
                <h2 className={styles.subtitle}>Search our site</h2>
                <SearchForm inputName='orderConfirmationSearch' />
            </div>
        </main>
    )
}

OrderConfirmation.propTypes = {
    orderNumber: PropTypes.string,
}

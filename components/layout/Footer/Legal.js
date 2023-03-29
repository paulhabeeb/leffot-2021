import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'
import styles from './Footer.module.scss'

export default function Legal({ data }) {
    return (
        <section className={styles.legal}>
            <PrismicRichText field={data} />
        </section>
    )
}

Legal.propTypes = {
    data: PropTypes.array,
}

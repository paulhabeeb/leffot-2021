import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import styles from './Footer.module.scss'
import FooterCol from './FooterCol'

export default function FooterNewsletterForm({ description, title }) {
    return (
        <FooterCol>
            <h2 className={styles.footerColTitle}>{title}</h2>
            <PrismicRichText field={description} />
            {/* <FormSlim context='footer' /> */}
        </FooterCol>
    )
}

FooterNewsletterForm.propTypes = {
    description: PropTypes.array,
    title: PropTypes.string,
}

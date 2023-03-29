import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'

import FooterNewsletterForm from './FooterNewsletterForm'
import FooterCol from '../FooterCol'
import styles from '../Footer.module.scss'

export default function FooterNewsletter({
    buttonLabel,
    description,
    inputPlaceholder,
    title,
}) {
    return (
        <FooterCol>
            <h2 className={styles.footerColTitle}>{title}</h2>
            <PrismicRichText field={description} />
            <FooterNewsletterForm
                buttonLabel={buttonLabel}
                context='footer'
                inputPlaceholder={inputPlaceholder}
            />
        </FooterCol>
    )
}

FooterNewsletter.propTypes = {
    buttonLabel: PropTypes.string,
    description: PropTypes.array,
    inputPlaceholder: PropTypes.string,
    title: PropTypes.string,
}

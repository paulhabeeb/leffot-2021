import PropTypes from 'prop-types'
import styles from './Footer.module.scss'
import FooterLinkSection from './FooterLinkSection'
import FooterNewsletter from './FooterNewsletter'

export default function FooterNav({ sections }) {
    return (
        <section className={styles.footerNav}>
            {sections.map((section, index) => {
                const { items, primary, slice_type } = section

                if (slice_type === 'link_list') {
                    return (
                        <FooterLinkSection
                            description={primary.description}
                            isSocial={primary.is_social}
                            links={items}
                            title={primary.list_title}
                            key={index}
                        />
                    )
                }

                if (slice_type === 'newsletter_form') {
                    return (
                        <FooterNewsletter
                            buttonLabel={primary.button_label}
                            description={primary.description}
                            inputPlaceholder={primary.input_placeholder}
                            title={primary.form_title}
                            key={index}
                        />
                    )
                }

                return null
            })}
        </section>
    )
}

FooterNav.propTypes = {
    sections: PropTypes.array,
}

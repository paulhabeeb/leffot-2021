import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'

import { RawHTML } from '@components/common'
import styles from './FAQItem.module.scss'

export default function FAQItem({ answer, html, question }) {
    return (
        <>
            <dt className={styles.question}>{asText(question)}</dt>
            <dd className={styles.answer}>
                <PrismicRichText field={answer} />
                {html.length > 0 && (
                    <RawHTML
                        className={styles.tableWrapper}
                        code={html[0].text}
                    />
                )}
            </dd>
        </>
    )
}

FAQItem.propTypes = {
    answer: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
    question: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
    html: PropTypes.array,
}

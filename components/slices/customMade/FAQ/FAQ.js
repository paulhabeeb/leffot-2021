import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import { FAQList } from '@components/slices/pages'
import FAQImage from './Image'
import styles from './FAQ.module.scss'

export default function FAQ({ image = null, questions, title }) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {image && <FAQImage image={image} />}
                <div className={styles.list}>
                    <h1 className={styles.title}>{asText(title)}</h1>
                    <FAQList questions={questions} title={title} />
                </div>
            </div>
        </section>
    )
}

FAQ.propTypes = {
    image: PropTypes.object,
    questions: PropTypes.array,
    title: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
}

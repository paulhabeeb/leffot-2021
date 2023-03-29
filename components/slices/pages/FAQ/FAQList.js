import PropTypes from 'prop-types'

import FAQItem from './FAQItem'
import styles from './FAQList.module.scss'

export default function FAQList({ questions }) {
    return (
        <dl className={styles.list}>
            {questions.map((qa, index) => (
                <FAQItem
                    answer={qa.answer}
                    html={qa.rawhtml}
                    question={qa.question}
                    key={index}
                />
            ))}
        </dl>
    )
}

FAQList.propTypes = {
    questions: PropTypes.array,
}

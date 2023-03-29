import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'

import styles from './SectionHeader.module.scss'

export default function TextSliceHeader({ body, children, title }) {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>{asText(title)}</h1>
            <div className={styles.body}>
                <PrismicRichText field={body} />
            </div>
            {children}
        </div>
    )
}

TextSliceHeader.propTypes = {
    body: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
    children: PropTypes.node,
    title: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
}

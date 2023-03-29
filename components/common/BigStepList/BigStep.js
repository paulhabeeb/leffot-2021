import PropTypes from 'prop-types'
import { PrismicRichText } from '@prismicio/react'
import cn from 'classnames'

import styles from './BigStep.module.scss'

export default function BigStep({ caption, children, className, title }) {
    const stepClassName = cn(styles.step, className)

    return (
        <li className={stepClassName}>
            <PrismicRichText field={title} />
            {caption && <PrismicRichText field={caption} />}
            {children}
        </li>
    )
}

BigStep.propTypes = {
    caption: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
    children: PropTypes.node,
    className: PropTypes.string,
    title: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
}

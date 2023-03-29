import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './SectionWrapper.module.scss'

export default function SectionWrapper({ children, customStyles }) {
    const className = cn(styles.container, customStyles)

    return <section className={className}>{children}</section>
}

SectionWrapper.propTypes = {
    children: PropTypes.node,
    customStyles: PropTypes.string,
}

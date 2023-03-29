import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Description.module.scss'

export default function Description({ className, description }) {
    const descriptionClassName = cn(styles.description, className)

    return (
        <div
            className={descriptionClassName}
            itemProp='description'
            dangerouslySetInnerHTML={{ __html: description }}
        />
    )
}

Description.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
}

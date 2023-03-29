import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './InputLabel.module.scss'

export default function InputLabel({
    children,
    element,
    label,
    isVisuallyHidden,
    size,
    ...props
}) {
    const ElementType = element
    const className = cn(styles.label, {
        visuallyHidden: isVisuallyHidden,
        [styles.large]: size === 'large',
    })
    const elementProps = { className }

    if (element === 'label') {
        elementProps.htmlFor = props.id || props.name
    }

    return (
        <ElementType {...elementProps}>
            {label}
            {children}
        </ElementType>
    )
}

InputLabel.defaultProps = {
    element: 'label',
    size: 'regular',
}

InputLabel.propTypes = {
    children: PropTypes.node,
    element: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    isVisuallyHidden: PropTypes.bool,
    name: PropTypes.string,
    size: PropTypes.string,
}

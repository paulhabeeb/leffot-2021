import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import cn from 'classnames'

import { BigStep } from '@components/common'
import styles from './GuideStep.module.scss'

export default function GuideStep({
    caption,
    child,
    isActive,
    isComplete,
    title,
}) {
    const height = isActive ? 'auto' : 0
    const className = cn(styles.step, {
        [styles.isActive]: isActive,
        [styles.isDisabled]: !isActive && !isComplete,
        [styles.isComplete]: isComplete,
    })

    return (
        <BigStep
            caption={isActive ? caption : null}
            className={className}
            title={title}
        >
            <AnimateHeight duration={500} delay={0} height={height}>
                {child}
            </AnimateHeight>
        </BigStep>
    )
}

GuideStep.propTypes = {
    caption: PropTypes.array,
    child: PropTypes.node,
    isActive: PropTypes.bool,
    isComplete: PropTypes.bool,
    title: PropTypes.array,
}

import { useState } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import cn from 'classnames'

import { ShowMoreShowLessButton } from '@components/forms/actions'
import styles from './OverflowSection.module.scss'

export default function OverflowSection({ hasTopPadding, options, split }) {
    const [isOpen, setIsOpen] = useState(false)
    const [height, setHeight] = useState(0)

    const onClick = event => {
        event.preventDefault()
        setHeight(height === 0 ? 'auto' : 0)
        setIsOpen(!isOpen)
    }

    const visibleOptions = options.slice(0, split)
    const overflowOptions = options.slice(split)

    const overflowClass = cn(styles.container, {
        [styles.hasTopPadding]: hasTopPadding,
    })
    const containerClass = cn({
        [styles.bottomPadding]: hasTopPadding,
    })

    return (
        <>
            {visibleOptions}
            <AnimateHeight
                duration={300}
                height={height}
                className={containerClass}
            >
                <div className={overflowClass}>{overflowOptions}</div>
            </AnimateHeight>
            <ShowMoreShowLessButton
                caption='options'
                isOpen={isOpen}
                onClick={onClick}
            />
        </>
    )
}

OverflowSection.propTypes = {
    hasTopPadding: PropTypes.bool,
    options: PropTypes.array,
    split: PropTypes.number,
}

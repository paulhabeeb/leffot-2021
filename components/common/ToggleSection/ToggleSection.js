import { useState } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'

import styles from './ToggleSection.module.scss'

export default function ToggleSection({
    children,
    buttonId,
    sectionId,
    title,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [height, setHeight] = useState(0)

    const handleClick = () => {
        setHeight(height === 0 ? 'auto' : 0)
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.h3}>
                <button
                    className={styles.button}
                    onClick={handleClick}
                    id={buttonId}
                    aria-expanded={isOpen ? 'true' : 'false'}
                    aria-controls={sectionId}
                >
                    {isOpen ? (
                        <>
                            <span>Hide the {title}</span>
                            <span>&ndash;</span>
                        </>
                    ) : (
                        <>
                            <span>Show the {title}</span>
                            <span>+</span>
                        </>
                    )}
                </button>
            </h3>
            <div id={sectionId} aria-labelledby={buttonId}>
                <AnimateHeight duration={500} height={height}>
                    <div className={styles.section}>{children}</div>
                </AnimateHeight>
            </div>
        </div>
    )
}

ToggleSection.propTypes = {
    buttonId: PropTypes.string,
    children: PropTypes.node,
    sectionId: PropTypes.string,
    title: PropTypes.string,
}

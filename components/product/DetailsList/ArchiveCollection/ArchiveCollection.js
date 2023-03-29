import { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import AnimateHeight from 'react-animate-height'
import cn from 'classnames'

import { ShowMoreShowLessButton } from '@components/forms/actions'
import DetailsList from '../DetailsList'
import styles from './ArchiveCollection.module.scss'

const Description = dynamic(() => import('../Description'))

export default function ArchiveCollection({ description, fields }) {
    const [height, setHeight] = useState(150)
    const [isOpen, setIsOpen] = useState(false)

    const handleDetailsClick = event => {
        event.preventDefault()
        setHeight(height === 150 ? 'auto' : 150)
        setIsOpen(!isOpen)
    }

    const gradientStyles = cn(styles.gradient, {
        [styles.isOpen]: isOpen,
    })

    return (
        <div className={styles.container}>
            <AnimateHeight
                id='archive-description'
                duration={200}
                height={height}
            >
                {description && <Description description={description} />}
                <DetailsList fields={fields} />
            </AnimateHeight>
            <div className={gradientStyles}></div>
            <ShowMoreShowLessButton
                caption='details'
                isOpen={isOpen}
                onClick={handleDetailsClick}
            />
        </div>
    )
}

ArchiveCollection.propTypes = {
    description: PropTypes.string,
    fields: PropTypes.object,
}

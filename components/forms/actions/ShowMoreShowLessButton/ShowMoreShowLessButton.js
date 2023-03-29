import PropTypes from 'prop-types'
import cn from 'classnames'

import { ChevronDown } from '@components/icons'
import styles from './ShowMoreShowLessButton.module.scss'

export default function ShowMoreShowLessButton({ caption, isOpen, onClick }) {
    return (
        <button
            className={styles.button}
            type='button'
            onClick={onClick}
            onKeyPress={onClick}
        >
            <span>
                Show {isOpen ? 'fewer' : 'more'} {caption}
            </span>
            <ChevronDown
                className={cn(styles.icon, {
                    [styles.isOpen]: isOpen,
                })}
            />
        </button>
    )
}

ShowMoreShowLessButton.propTypes = {
    caption: PropTypes.string,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func,
}

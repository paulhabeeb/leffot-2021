import PropTypes from 'prop-types'
import { CircleLoader } from '@components/placeholders'

import cn from 'classnames'
import styles from './ActionButton.module.scss'

export default function ActionButton({
    borderBottom,
    borderTop,
    caption,
    children,
    isLoading,
    isShown,
    marginLeft,
    onClick,
    padding,
}) {
    if (!isShown) return null

    const buttonClass = cn(styles.button, {
        [styles.noBottomBorder]: !borderBottom,
        [styles.noTopBorder]: !borderTop,
        [styles.marginLeftHalf]: marginLeft === 'half',
        [styles.paddingLarge]: padding === 'large',
    })

    return (
        <button className={buttonClass} disabled={isLoading} onClick={onClick}>
            {isLoading ? (
                <CircleLoader size={14} />
            ) : (
                <>
                    {caption && (
                        <span className='visuallyHidden'>{caption}</span>
                    )}
                    <span className={styles.icon}>{children}</span>
                </>
            )}
        </button>
    )
}

ActionButton.defaultProps = {
    borderBottom: true,
    borderTop: true,
    isShown: true,
}

ActionButton.propTypes = {
    borderBottom: PropTypes.bool,
    borderTop: PropTypes.bool,
    caption: PropTypes.string,
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    isShown: PropTypes.bool,
    marginLeft: PropTypes.string,
    onClick: PropTypes.func,
    padding: PropTypes.string,
}

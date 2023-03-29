import PropTypes from 'prop-types'
import Image from "next/legacy/image"

import cn from 'classnames'
import styles from './HoverSwatchTooltip.module.scss'

export default function HoverSwatchTooltip({
    altText,
    handleMobileSelect,
    imgUrl,
    isSelected,
    label,
}) {
    const className = cn(styles.checkmark, {
        [styles.isSelected]: isSelected,
    })

    return (
        <div className={styles.container}>
            <Image alt={altText} height={320} src={imgUrl} width={400} />
            <span className={styles.label}>{label}</span>
            <button
                className={styles.button}
                onClick={handleMobileSelect}
                onKeyPress={handleMobileSelect}
            >
                <span className={className}>
                    <svg
                        className='checkmark'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 52 52'
                    >
                        <path
                            className='checkmark__check'
                            fill='none'
                            d='M14.1 27.2l7.1 7.2 16.7-16.8'
                        />
                    </svg>
                </span>
                <span>{isSelected ? 'Selected' : 'Select'}</span>
            </button>
        </div>
    )
}

HoverSwatchTooltip.propTypes = {
    altText: PropTypes.string,
    handleMobileSelect: PropTypes.func,
    imgUrl: PropTypes.string,
    isSelected: PropTypes.bool,
    label: PropTypes.string,
}

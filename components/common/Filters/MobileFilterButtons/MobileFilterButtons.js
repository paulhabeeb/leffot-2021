import PropTypes from 'prop-types'

import styles from './MobileFilterButtons.module.scss'

export default function MobileFilterButtons({ buttons }) {
    return (
        <div className={styles.container}>
            {buttons.map((button, index) => (
                <div className={styles.buttonContainer} key={index}>
                    {button}
                </div>
            ))}
        </div>
    )
}

MobileFilterButtons.propTypes = {
    buttons: PropTypes.array,
}

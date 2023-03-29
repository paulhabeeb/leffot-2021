import PropTypes from 'prop-types'
import cn from 'classnames'

import BarLoader from '../BarLoader'
import styles from './PageLoader.module.scss'

export default function PageLoader({ customStyles }) {
    const className = cn(customStyles, styles.bar)

    return (
        <div className={className}>
            <BarLoader fill='var(--color-dark-grey)' />
        </div>
    )
}

PageLoader.propTypes = {
    customStyles: PropTypes.string,
}

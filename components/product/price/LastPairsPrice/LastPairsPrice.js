import PropTypes from 'prop-types'
import cn from 'classnames'

import Wrapper from '../Wrapper'
import styles from './LastPairsPrice.module.scss'

export default function LastPairsPrice({ context, price }) {
    const className = cn(styles.message, {
        [styles.messageBig]: context === 'product',
    })

    return (
        <Wrapper context={context}>
            <span className='slashPrice'>{price}</span>
            <span className={className}>Last pair, contact us for price</span>
        </Wrapper>
    )
}

LastPairsPrice.propTypes = {
    context: PropTypes.string,
    price: PropTypes.string,
}

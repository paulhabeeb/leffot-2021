import PropTypes from 'prop-types'

import MTOFee from '../MTOFee'
import Wrapper from '../Wrapper'
import styles from './NormalPrice.module.scss'

export default function NormalPrice({
    basePrice,
    context,
    fields,
    isArchiveColl,
    isPreorder,
    price,
}) {
    return (
        <Wrapper context={context}>
            {basePrice && !isArchiveColl ? (
                <>
                    <span className='slashPrice'>{basePrice}</span>
                    <span className='salePrice'>{price}</span>
                    {context === 'product' && (
                        <div className={styles.finalSale}>
                            This item is final sale
                        </div>
                    )}
                </>
            ) : (
                <span>
                    {price}
                    {isPreorder && ' deposit'}
                </span>
            )}
            <div className={styles.mto}>
                <MTOFee context={context} fields={fields} />
            </div>
        </Wrapper>
    )
}

NormalPrice.propTypes = {
    basePrice: PropTypes.string,
    context: PropTypes.string,
    fields: PropTypes.object,
    isArchiveColl: PropTypes.bool,
    isPreorder: PropTypes.bool,
    price: PropTypes.string,
}

import PropTypes from 'prop-types'

import ItemName from './ItemName'
import ItemOptions from './ItemOptions'
import styles from './ItemDetails.module.scss'

export default function ItemDetails({
    extraOptions,
    name,
    options,
    pre_order_message,
}) {
    return (
        <div className={styles.item}>
            <ItemName name={name} />
            {pre_order_message && (
                <p>Ships {pre_order_message} from date of order</p>
            )}
            {(options?.length > 0 || extraOptions?.length > 0) && (
                <ItemOptions extraOptions={extraOptions} options={options} />
            )}
        </div>
    )
}

ItemDetails.propTypes = {
    extraOptions: PropTypes.array,
    name: PropTypes.string,
    options: PropTypes.array,
    pre_order_message: PropTypes.string,
}

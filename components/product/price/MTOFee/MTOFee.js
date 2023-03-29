import PropTypes from 'prop-types'

import styles from './MTOFee.module.scss'

export default function MTOFee({ context, fields }) {
    if (context === 'product' && fields?.mto_fee) {
        return (
            <div className={styles.mtoFee}>
                Includes {fields.mto_fee.value} MTO surcharge
            </div>
        )
    }

    return null
}

MTOFee.propTypes = {
    context: PropTypes.string,
    fields: PropTypes.object,
}

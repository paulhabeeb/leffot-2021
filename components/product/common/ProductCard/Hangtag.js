import PropTypes from 'prop-types'
import { compareDates } from '@lib/compare-dates'

import styles from './Hangtag.module.scss'

export default function Hangtag({ fields }) {
    if (fields && (fields.new_until || fields.new_from)) {
        const newFrom = fields.new_from ? fields.new_from.value : null
        const newUntil = fields.new_until ? fields.new_until.value : null
        const shouldDisplay = compareDates(newFrom, newUntil)

        if (shouldDisplay) {
            return (
                <div className={styles.hangtag}>
                    <span>New</span>
                </div>
            )
        }

        return null
    }

    return null
}

Hangtag.propTypes = {
    fields: PropTypes.object,
}

import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react'

import { Info as InfoIcon } from '@components/icons'
import styles from './UltimatePackageLabel.module.scss'

export default function UltimatePackageLabel({ name }) {
    let tooltip =
        'Customize leather, piping, lining, and soles at a lower charge.'
    if (name === 'Black edition') {
        tooltip =
            'Select black calf, black or red piping, and natural lining at a lower charge.'
    }

    return (
        <Tippy content={<div className={styles.tooltip}>{tooltip}</div>}>
            <button className={styles.button}>
                {name}
                <InfoIcon styles={styles.icon} />
            </button>
        </Tippy>
    )
}

UltimatePackageLabel.propTypes = {
    name: PropTypes.string,
}

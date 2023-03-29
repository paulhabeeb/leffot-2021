import PropTypes from 'prop-types'
import { upcharges } from '@lib/mto/upcharges'
import { capitalizeFirstLetter } from '@lib/capitalize-first-letter'

import UltimatePackageLabel from './UltimatePackageLabel'
import styles from './TallyItem.module.scss'

const getCharge = (brandName, option) =>
    upcharges[brandName][option].toLocaleString(undefined, {
        minimumFractionDigits: 2,
    })

export default function TallyItem({ brandName, name, basePrice }) {
    let symbol = '+'
    if (name === 'black edition') symbol = '–'
    const capName = capitalizeFirstLetter(name)
    const showUltimatePackageLabel =
        capName === 'Ultimate package' || capName === 'Black edition'
    const charge =
        basePrice || `${symbol} $${getCharge(brandName, name).replace('-', '')}`

    return (
        <div className='tally-wrapper'>
            <dt className={styles.dt}>
                {showUltimatePackageLabel ? (
                    <UltimatePackageLabel name={capName} />
                ) : (
                    <>{capName}</>
                )}
            </dt>
            <dd className={styles.dd}>{charge}</dd>
        </div>
    )
}

TallyItem.propTypes = {
    basePrice: PropTypes.string,
    brandName: PropTypes.string,
    name: PropTypes.string,
}

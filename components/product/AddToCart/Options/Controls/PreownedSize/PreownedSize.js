import PropTypes from 'prop-types'
import formatLabel from '@lib/products/format-label'

import styles from './PreownedSize.module.scss'

export default function PreownedSize({ conditionals, country, option }) {
    const { displayName, values } = option

    let label = ''
    values.forEach(value => {
        label = formatLabel(
            {
                ...conditionals,
                country,
                isArchiveColl: false,
            },
            option,
            value
        )
    })

    return (
        <dl className={styles.dl}>
            <dt className={styles.dt}>{displayName}</dt>
            <dd className={styles.dd}>{label}</dd>
        </dl>
    )
}

PreownedSize.propTypes = {
    conditionals: PropTypes.object,
    country: PropTypes.string,
    option: PropTypes.shape({
        displayName: PropTypes.string,
        id: PropTypes.number,
        values: PropTypes.arrayOf(
            PropTypes.shape({
                data: PropTypes.string,
                id: PropTypes.number,
                label: PropTypes.string,
                selected: PropTypes.bool,
            })
        ),
    }),
}

import PropTypes from 'prop-types'
import { InputLabel } from '@leffot/form-controls'

import Description from '../Description'
import styles from './DescriptionAndInspo.module.scss'

export default function DescriptionAndInspo({ description }) {
    return (
        <div className={styles.container}>
            <InputLabel element='div' label='Description' size='large' />
            <Description
                className={styles.description}
                description={description}
            />
        </div>
    )
}

DescriptionAndInspo.propTypes = {
    description: PropTypes.string,
}

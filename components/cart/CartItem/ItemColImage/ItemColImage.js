import PropTypes from 'prop-types'

import { FigureWithMultiply } from '@components/common'
import styles from './ItemColImage.module.scss'

export default function ItemColImage({ image }) {
    return (
        <td className={styles.itemColImage}>
            <FigureWithMultiply images={image} />
        </td>
    )
}

ItemColImage.propTypes = {
    image: PropTypes.array,
}

import PropTypes from 'prop-types'
import Image from "next/legacy/image"

import styles from '../DetailItem/DetailItem.module.scss'
import beltStyles from './BeltSizeGuide.module.scss'
import beltImage from '@public/belt-with-arrow.png'

export default function BeltSizeGuide({ brand }) {
    return (
        <div>
            <div className={styles.title}>
                {brand.name === 'Kreis' ? 'Sizing' : 'Belt Sizing'}
            </div>
            <div className={styles.content}>
                <ol className={beltStyles.ol}>
                    <li>
                        On a belt that fits you well, measure from the hole you
                        use most to the buckle’s far end.
                    </li>
                    <li>
                        Convert the measurement to centimeters. This is the size
                        you should wear.
                    </li>
                    <li>
                        If you fall between sizes, round up to the next size.
                    </li>
                </ol>
                <figure className={beltStyles.figure}>
                    <Image
                        alt='An illustration of a belt, with an arrow from the middle hole to the inside edge of the buckle.'
                        placeholder='blur'
                        src={beltImage}
                    />
                    <figcaption className={beltStyles.cp}>
                        {brand.name} belts are sized from the middle hole to the
                        inside edge of the buckle’s far end.
                    </figcaption>
                </figure>
            </div>
        </div>
    )
}

BeltSizeGuide.propTypes = {
    brand: PropTypes.object,
}

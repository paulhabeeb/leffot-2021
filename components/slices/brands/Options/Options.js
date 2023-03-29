import PropTypes from 'prop-types'
import { PrismicText } from '@prismicio/react'

import OptionsWrapper from '../OptionsWrapper'
import styles from './Options.module.scss'

function Option({ image, option }) {
    return (
        <li className={styles.option}>
            {image && (
                <img className={styles.optionImage} src={image.url} alt='' />
            )}
            <h4>
                <PrismicText field={option} />
            </h4>
        </li>
    )
}

Option.propTypes = {
    image: PropTypes.object,
    option: PropTypes.array,
}

export default function Options({ slice }) {
    const {
        fields,
        primary: { option_name },
    } = slice

    return (
        <OptionsWrapper>
            {option_name && (
                <h3>
                    <PrismicText field={option_name} />
                </h3>
            )}
            <ul className={styles.options}>
                {fields.map((field, index) => (
                    <Option
                        image={field.option_image}
                        option={field.option}
                        key={index}
                    />
                ))}
            </ul>
        </OptionsWrapper>
    )
}

Options.propTypes = {
    slice: PropTypes.object,
}

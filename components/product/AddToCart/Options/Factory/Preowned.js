import PropTypes from 'prop-types'

import { useProductContext } from '@components/product'
import PreownedSize from '../Controls/PreownedSize'

export default function PreownedFactory({ conditionals, fields }) {
    const { availableOptions } = useProductContext()
    const powOptions = []

    availableOptions.forEach((option, index) => {
        powOptions.push(
            <PreownedSize
                conditionals={conditionals}
                country={fields.pow_size_uk_or_us.value}
                option={option}
                key={index}
            />
        )
    })

    return powOptions
}

PreownedFactory.propTypes = {
    conditionals: PropTypes.object,
    fields: PropTypes.object,
}

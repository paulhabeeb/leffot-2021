import PropTypes from 'prop-types'
import cn from 'classnames'

import s from './ItemName.module.scss'

export default function ItemName({ name, styles }) {
    const className = cn(s.itemName, styles)

    return <h4 className={className}>{name}</h4>
}

ItemName.propTypes = {
    name: PropTypes.string,
    styles: PropTypes.string,
}

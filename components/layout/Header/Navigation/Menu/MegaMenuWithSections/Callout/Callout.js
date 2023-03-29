import PropTypes from 'prop-types'
import { asText } from '@prismicio/helpers'

import MenuItemLink from '../../MenuItemLink'
import styles from './Callout.module.scss'

export default function Callout({
    buttonLink,
    buttonText,
    description,
    hideMenu,
    title,
}) {
    return (
        <li>
            <div className={styles.wrapper}>
                <h3 className={styles.callloutTitle}>{title}</h3>
                <p className={styles.calloutDescription}>
                    {asText(description)}
                </p>
                <MenuItemLink
                    name={buttonText}
                    onClick={hideMenu}
                    styles={styles.calloutButton}
                    url={buttonLink}
                >
                    <span className='linkName'>{buttonText}</span>
                </MenuItemLink>
            </div>
        </li>
    )
}

Callout.propTypes = {
    buttonLink: PropTypes.object,
    buttonText: PropTypes.string,
    description: PropTypes.array,
    hideMenu: PropTypes.func,
    title: PropTypes.string,
}

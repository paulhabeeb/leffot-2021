import PropTypes from 'prop-types'
import Image from "next/legacy/image"
import { PrismicRichText } from '@prismicio/react'

import MenuItemLink from '../../MenuItemLink'
import styles from './CategoriesChild.module.scss'

export default function CategoriesChild({
    description,
    hideMenu,
    image,
    name,
    url,
}) {
    return (
        <li className={styles.category}>
            <MenuItemLink
                hasUnderline={false}
                name={name}
                onClick={hideMenu}
                url={url}
            >
                <span className='visuallyHidden'>{name}</span>
                <div className={styles.categoryImage}>
                    <Image
                        alt={image.alt || ''}
                        height={image.dimensions.height}
                        src={image.url}
                        width={image.dimensions.width}
                    />
                </div>
                <div>
                    <span className={styles.categoryName}>
                        <span className='linkName'>{name}</span>
                    </span>
                    <span className={styles.categoryCaption}>
                        <PrismicRichText field={description} />
                    </span>
                </div>
            </MenuItemLink>
        </li>
    )
}

CategoriesChild.propTypes = {
    description: PropTypes.array,
    image: PropTypes.object,
    name: PropTypes.string,
    url: PropTypes.object,
    hideMenu: PropTypes.func,
}

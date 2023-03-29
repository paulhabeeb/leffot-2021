import PropTypes from 'prop-types'
import linkResolver from '@lib/link-resolver'

import BrandCard from '../brands/BrandCard'
import styles from './CategoriesGrid.module.scss'

export default function CategoriesGrid({ categories }) {
    const cards = []

    categories.forEach(category => {
        const { banner_image, name } = category.data
        const link = linkResolver(category)

        cards.push(
            <li key={category.uid}>
                <BrandCard
                    image={banner_image?.categoryCard}
                    link={link}
                    name={name}
                    showButton={false}
                />
            </li>
        )
    })

    return <ul className={styles.brandGrid}>{cards}</ul>
}

CategoriesGrid.propTypes = {
    categories: PropTypes.array,
}

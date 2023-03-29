import PropTypes from 'prop-types'
import linkResolver from '@lib/link-resolver'

import BrandCard from './BrandCard'
import styles from './BrandsGrid.module.scss'

export default function BrandsGrid({
    brands,
    selectedOfferings,
    selectedType,
}) {
    const cards = []

    brands.forEach(brand => {
        const { banner_image, caption, name, offerings, type } = brand.data
        const link = linkResolver(brand)

        if (selectedType !== 'All' && selectedType !== type) {
            return
        }
        if (
            selectedOfferings !== 'All' &&
            offerings !== 'Both' &&
            selectedOfferings !== offerings
        ) {
            return
        }

        cards.push(
            <li key={brand.uid}>
                <BrandCard
                    caption={caption}
                    image={banner_image}
                    link={link}
                    name={name}
                />
            </li>
        )
    })

    return <ul className={styles.brandGrid}>{cards}</ul>
}

BrandsGrid.propTypes = {
    brands: PropTypes.array,
    selectedOfferings: PropTypes.string,
    selectedType: PropTypes.string,
}

import PropTypes from 'prop-types'
import linkResolver from '@lib/link-resolver'

import { BrandCard } from '@components/brands'
import CardsWrapper from '../CardsWrapper'
import SectionHeader from '../SectionHeader'
import SectionWrapper from '../SectionWrapper'

export default function Brands({ body, cards, title }) {
    const cardsGrid = cards.map(brand => {
        const { card_caption, card_image, card_title } = brand.data
        const link = linkResolver(brand)

        return (
            <li key={brand.uid}>
                <BrandCard
                    caption={card_caption}
                    image={card_image}
                    link={link}
                    name={card_title}
                />
            </li>
        )
    })

    return (
        <SectionWrapper>
            <SectionHeader body={body} title={title} />
            <CardsWrapper>{cardsGrid}</CardsWrapper>
        </SectionWrapper>
    )
}

Brands.propTypes = {
    body: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
    cards: PropTypes.array,
    title: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
        })
    ),
}

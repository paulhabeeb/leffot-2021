import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'

const ArchiveCollection = dynamic(() => import('./ArchiveCollection'))
const Default = dynamic(() => import('./Default'))
const DescriptionAndInspo = dynamic(() => import('./DescriptionAndInspo'))
const Preorder = dynamic(() => import('./Preorder'))
const Preowned = dynamic(() => import('./Preowned'))
const Watches = dynamic(() => import('./Watches'))

export default function DetailsList({
    brand,
    description,
    fields,
    isArchiveColl,
    isPreowned,
    isPreorder,
    isWatch,
    prices,
    sizeChart,
}) {
    if (isArchiveColl) {
        if (
            brand.name !== 'Corthay' &&
            brand.name !== 'Edward Green' &&
            brand.name !== 'Gaziano & Girling' &&
            brand.name !== 'Hiro Yanagimachi'
        ) {
            return (
                <ArchiveCollection description={description} fields={fields} />
            )
        }

        if (description) {
            return <DescriptionAndInspo description={description} />
        }

        return null
    }

    if (isPreowned) {
        return <Preowned fields={fields} prices={prices} />
    }

    if (isPreorder) {
        return (
            <Preorder
                description={description}
                fields={fields}
                sizeChart={sizeChart}
            />
        )
    }

    if (isWatch) {
        return <Watches description={description} fields={fields} />
    }

    return (
        <Default
            brand={brand}
            description={description}
            fields={fields}
            sizeChart={sizeChart}
        />
    )
}

DetailsList.propTypes = {
    brand: PropTypes.object,
    description: PropTypes.string,
    fields: PropTypes.object,
    isArchiveColl: PropTypes.bool,
    isPreowned: PropTypes.bool,
    isPreorder: PropTypes.bool,
    isWatch: PropTypes.bool,
    prices: PropTypes.object,
    sizeChart: PropTypes.object,
}

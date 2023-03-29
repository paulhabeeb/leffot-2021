import { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'

const ArchiveFactory = dynamic(() => import('./Archive'))
const DefaultFactory = dynamic(() => import('./Default'))
const PreownedFactory = dynamic(() => import('./Preowned'))
const MonogramFactory = dynamic(() => import('./Monogram'))

export default function FormOptionsFactory({
    archiveData,
    brand,
    fields,
    isArchiveColl,
    isPreorder,
    isPreorderAvailable,
    isPreowned,
}) {
    const productType = fields.product_type ? fields.product_type.value : ''

    const [conditionals] = useState({
        archiveData: archiveData,
        brandName: brand.name,
        isArchiveColl,
        productType,
    })

    if (isPreorder && !isPreorderAvailable) {
        return null
    }
    if (isPreowned) {
        return <PreownedFactory conditionals={conditionals} fields={fields} />
    }
    if (isArchiveColl) {
        if (brand.name === 'Hiro Yanagimachi') {
            return (
                <MonogramFactory conditionals={conditionals} fields={fields} />
            )
        }

        return <ArchiveFactory conditionals={conditionals} fields={fields} />
    }

    return <DefaultFactory conditionals={conditionals} />
}

FormOptionsFactory.propTypes = {
    archiveData: PropTypes.object,
    brand: PropTypes.object,
    fields: PropTypes.object,
    isArchiveColl: PropTypes.bool,
    isPreorder: PropTypes.bool,
    isPreorderAvailable: PropTypes.bool,
    isPreowned: PropTypes.bool,
}

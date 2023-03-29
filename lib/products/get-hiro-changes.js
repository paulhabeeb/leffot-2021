const getHYProductVals = productOptions => {
    let monogramLeftName = null
    let monogramRightName = null
    let styleName = null
    let styleValMonogram = null

    productOptions.forEach(option => {
        const attrName = option.entityId.toString()
        if (option.displayName === 'Left') {
            monogramLeftName = attrName
        }
        if (option.displayName === 'Right') {
            monogramRightName = attrName
        }
        if (option.displayName === 'Style') {
            styleName = attrName
            option.values.forEach(val => {
                if (val.label === 'Monogram') {
                    styleValMonogram = val.entityId
                }
            })
        }
    })

    return {
        monogramLeftName,
        monogramRightName,
        styleName,
        styleValMonogram,
    }
}

const getHYChanges = (values, product) => {
    if (product.brand.name !== 'Hiro Yanagimachi') {
        return null
    }

    const { monogramLeftName, monogramRightName, styleName, styleValMonogram } =
        getHYProductVals(product.productOptions)

    let shouldExclude = false
    for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
            if (
                key === styleName &&
                values[key].toString() !== styleValMonogram.toString()
            ) {
                shouldExclude = true
            }
        }
    }

    return {
        exclusions: [monogramLeftName, monogramRightName],
        shouldExclude,
    }
}

export default getHYChanges

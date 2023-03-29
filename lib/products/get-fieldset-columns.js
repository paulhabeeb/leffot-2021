import cleanOptionName from '@lib/clean-option-name'

const getFieldsetColumns = (displayName, brandName) => {
    const cleanedOptionName = cleanOptionName(displayName)
    let isFourColumns = false
    let isOneColumn = true
    let isThreeColumns = false
    let isTwoColumns = false

    // Two columns
    if (
        brandName === 'Edward Green' ||
        cleanedOptionName === 'Add Shoe Trees' ||
        displayName === 'Width'
    ) {
        isOneColumn = false
        isTwoColumns = true
    }

    // Three columns
    if (displayName === 'Size' && brandName === 'Hiro Yanagimachi') {
        isOneColumn = false
        isThreeColumns = true
    }

    // Four columns
    if (
        displayName === 'Size' &&
        brandName !== 'Edward Green' &&
        brandName === 'Hiro Yanagimachi'
    ) {
        isOneColumn = false
        isFourColumns = true
    }

    return {
        isFourColumns,
        isOneColumn,
        isThreeColumns,
        isTwoColumns,
    }
}

export default getFieldsetColumns

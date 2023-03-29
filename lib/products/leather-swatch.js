import { corthay, edwardGreen, gazianoGirling } from '@lib/mto/leathers'

export const getLeatherColor = (option, productOptions) => {
    // We return an array with an id and selected value
    const leatherColor = {
        id: '',
        value: '',
    }

    // Some shoes have to leather options, e.g., for foot and
    // shaft. They're labelled "Leather (foot)" and so on. So
    // we strip out the leading "Leather " so we just have the
    // extension "(foot)". Then we add that to "Leather Color "
    // and find the product option named "Leather Color (foot)".
    let textFieldName = 'Leather Color'
    const ext = option.displayName.replace('Leather ', '')

    if (ext !== 'Leather') {
        textFieldName = `Leather Color ${ext}`
    }

    productOptions.forEach(subOption => {
        if (subOption.displayName === textFieldName) {
            leatherColor.id = subOption.entityId
            leatherColor.value = subOption.defaultValue
        }
    })

    return leatherColor
}

export const getLeathers = brand => {
    let leathers = null
    if (brand === 'Corthay') {
        leathers = corthay
    }
    if (brand === 'Edward Green') {
        leathers = edwardGreen
    }
    if (brand === 'Gaziano & Girling') {
        leathers = gazianoGirling
    }

    return leathers
}

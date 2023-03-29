import { isLastCharAnInt } from '@lib/regex'

const formatEdwardGreenSize = value => {
    const size = value.label
    const sizeLen = size.length
    let width = ''
    let ukSize = Number(size)

    // If the last character of the size is a letter,
    // we need to trim it to get just the size
    if (!isLastCharAnInt.test(size)) {
        width = size.substring(sizeLen - 1)
        ukSize = Number(size.slice(0, -1))
    }

    const usSize = ukSize + 0.5
    const convertedSize = `UK ${ukSize} / US ${usSize}${width}`

    return convertedSize
}

export default function formatLabel(conditionals, option, value) {
    const { brandName, country, isArchiveColl, productType } = conditionals
    const { displayName: optionName } = option

    let label = value.label

    // We want to format shoes only. Some brands (EG, Alden) have non-shoe products.
    // We don't want those products to have weird sizes labels. So we target Default (shoes),
    // Pre-owned (which only has shoes), and the Archive Collection, which also only has shoes.
    if (
        optionName === 'Size' &&
        (productType === 'Default' ||
            productType === 'Pre-owned' ||
            productType === 'Pre-order' ||
            isArchiveColl)
    ) {
        switch (brandName) {
            case 'Edward Green':
                if (isArchiveColl) {
                    label = formatEdwardGreenSize(value)
                    break
                }
                label = formatEdwardGreenSize(value)
                break
            case 'Alden':
            case 'Corthay':
            case 'Hiro Yanagimachi':
            case 'Quoddy':
            case 'Wolverine':
                label = `US ${value.label}`
                break
            case 'Drake’s':
            case "Drake's":
            case 'Enzo Bonafè':
            case 'Gaziano & Girling':
            case 'Norman Vilalta':
            case 'Saint Crispin’s':
            case "Saint Crispin's":
                label = `UK ${value.label}`
                break
            default:
                if (country) label = `${country} ${value.label}`
                break
        }
    }
    if (optionName === 'Width' && isArchiveColl) {
        if (
            brandName === "Saint Crispin's" ||
            brandName === 'Saint Crispin’s'
        ) {
            switch (value.label) {
                case 'E':
                    label = `${value.label} (narrow)`
                    break
                case 'F':
                    label = `${value.label} (standard)`
                    break
                case 'G':
                    label = `${value.label} (wide)`
                    break
                default:
                    break
            }
        }

        if (brandName === 'Edward Green' || brandName === 'Gaziano & Girling') {
            switch (value.label) {
                case 'C':
                    label = `${value.label} (extra narrow)`
                    break
                case 'D':
                    label = `${value.label} (narrow)`
                    break
                case 'E':
                    label = `${value.label} (standard)`
                    break
                case 'F':
                    label = `${value.label} (wide)`
                    break
                case 'G':
                    label = `${value.label} (extra wide)`
                    break
                default:
                    break
            }
        }
    }

    return label
}

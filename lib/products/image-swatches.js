export const getImageUrl = (
    label,
    conditionals,
    defaultImage,
    optionName,
    size
) => {
    const { brandName, selectedColor } = conditionals

    if (brandName === 'Hiro Yanagimachi') {
        if (optionName === 'color') {
            const color = label.toLowerCase().replace(' ', '-')

            return `/content/hiro-yanagimachi/colors/${color}-${size}.jpg`
        }
        if (optionName === 'style' && selectedColor !== null) {
            return `/content/hiro-yanagimachi/styles/${label.toLowerCase()}-${selectedColor}-${size}.jpg`
        }
        if (optionName === 'monogram') {
            const color = selectedColor !== null ? selectedColor : 'grey'

            return `/content/hiro-yanagimachi/foot/${optionName}-${color}-${label}-${size}.jpg`
        }
    }

    return defaultImage
}

const updateImgOnSelect = (labelData, urlGenerator, mainImgData) => {
    const { label, labelType, altText } = labelData

    // An object with the pieces of the URL and a function to update the object so the
    // information stays relevant
    const [mainImgUrl, updateMainImgUrl] = urlGenerator

    // Functions to actually update the image the user sees
    const [setImageIsLoading, defaultImage, setDefaultImage] = mainImgData

    // Name of selected value, e.g., red, purple, calfskin, etc
    const formattedLabel = label.toLowerCase().replace(' ', '-')

    // Update our object so other options can know which label we selected
    const newMainImgUrl = {
        ...mainImgUrl,
        [labelType]: formattedLabel,
    }

    if (updateMainImgUrl !== null) {
        updateMainImgUrl({ ...newMainImgUrl })
    }

    // Create the new url if we have all the data, otherwise leave it blank
    if (newMainImgUrl.color !== null) {
        const newUrl = mainImgUrl.base
            .replace('{:style}', newMainImgUrl.style)
            .replace('{:color}', newMainImgUrl.color)

        if (defaultImage.urlOriginal !== newUrl) {
            setImageIsLoading(true)
            setDefaultImage({
                alt: altText,
                urlOriginal: newUrl,
            })
        }
    }
}

export default updateImgOnSelect

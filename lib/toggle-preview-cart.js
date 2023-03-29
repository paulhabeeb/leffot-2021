const togglePreviewCart = (show = true) => {
    const dropdown = document.querySelector('#previewCartDropdown')

    if (!dropdown && show) {
        document.querySelector('#previewCart').firstChild.click()
    }

    if (dropdown && !show) {
        document.querySelector('#previewCart').firstChild.click()
    }
}

export default togglePreviewCart

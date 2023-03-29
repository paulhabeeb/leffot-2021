import generateBase64Image from '@lib/generate-base64-image'

export default async function getGallery(initGallery) {
    if (initGallery?.[0]?.gallery_image?.url) {
        const ops = []

        for (let i = 0; i < initGallery.length; i++) {
            ops.push(generateBase64Image(initGallery[i].gallery_image))
        }

        const base64Images = await Promise.all(ops)

        return initGallery.map((image, index) => {
            return {
                ...image,
                gallery_image: base64Images[index],
            }
        })
    }

    return []
}

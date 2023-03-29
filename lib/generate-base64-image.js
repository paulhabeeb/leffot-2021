import { getPlaiceholder } from 'plaiceholder'

export default async function generateBase64Image(image) {
    const { base64 } = await getPlaiceholder(image.url)

    return {
        ...image,
        base64,
    }
}

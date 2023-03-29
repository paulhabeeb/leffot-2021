import Link from 'next/link'
import { urls } from '@lib/data'
import cleanOptionName from '@lib/clean-option-name'

const getSizeCaption = (fields, type) => {
    if (type !== 'Default') {
        return null
    }

    return (
        <>
            {fields && (
                <p
                    dangerouslySetInnerHTML={{
                        __html: fields?.size_guidance?.value,
                    }}
                />
            )}
            <p>
                Don’t know your size? Consult our{' '}
                <Link href={urls.pages.sizing}>size guide</Link>.
            </p>
        </>
    )
}

const Corthay = {
    Lace: 'Add some pop or choose something subdued.',
    Last: 'Choose the shape that fits your foot best.',
    Leather: 'Choose from any of Corthay’s solid leathers or iconic patinas.',
    Lining: 'Because even the unseen details make a difference.',
    Piping: 'Choose a contrasting trim for unique flair or keep it subtle with one that matches.',
    Sole: 'From slim and sleek to rugged and ready for anything, the choice is yours.',
    'Toe Plates':
        'Extend the life of your soles. Available only with leather soles.',
}

const EdwardGreen = {
    Last: 'Choose the shape that fits your foot best.',
    Leather: '',
    Sole: 'From slim and sleek to rugged and ready for anything, the choice is yours.',
    'Toe Plates':
        'Extend the life of your soles. Available only with leather soles.',
    Width: 'Edward Green’s standard width is E.',
}

const Gaziano = {
    Last: 'Choose the shape that fits your foot best.',
    Leather: '',
    Sole: 'From slim and sleek to rugged and ready for anything, the choice is yours.',
    'Toe Plates':
        'Extend the life of your soles. Available only with leather soles.',
    Width: 'Gaziano & Girling’s standard width is E.',
}

const optionCaptions = {
    Corthay,
    'Edward Green': EdwardGreen,
    'Gaziano & Girling': Gaziano,
}

const getOptionCaption = ({ brand, fields, type, value }) => {
    const cleanedName = cleanOptionName(value)
    const regexBeginWithAdd = RegExp(/^Add\s/)
    let cleanedValueName = value

    if (regexBeginWithAdd.test(cleanedName)) {
        cleanedValueName = cleanedName.replace(regexBeginWithAdd, '')
    }

    let caption = null

    if (cleanedValueName === 'Size') {
        caption = getSizeCaption(fields, type)
    } else if (optionCaptions?.[brand]?.[cleanedValueName]) {
        caption = optionCaptions[brand][cleanedValueName]
    }

    return caption
}

export default getOptionCaption

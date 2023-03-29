import { baseUrl } from '@lib/regex'

export default function linkResolver(doc, isTopLevel = false) {
    if (doc?.link_type === 'Web') {
        return doc.url.replace(baseUrl, '')
    }

    if (isTopLevel) {
        return `/${doc.uid}`
    }

    if (doc.type === 'blog_post') {
        return `/journal/${doc.uid}`
    }
    if (doc.type === 'brand') {
        return `/brands/${doc.uid}`
    }
    if (doc.type === 'category') {
        if (doc.uid === 'pre-owned') {
            return '/pre-owned'
        }

        return `/categories/${doc.uid}`
    }
    if (doc.type === 'custom_made_brand') {
        return `/custom-made/${doc.uid}`
    }
    if (doc.type === 'event') {
        return `/event/${doc.uid}`
    }
    if (
        doc.type === 'events' ||
        doc.type === 'page' ||
        doc.type === 'search' ||
        doc.type === 'size_guide'
    ) {
        return `/${doc.uid}`
    }

    // Default to homepage
    return '/'
}

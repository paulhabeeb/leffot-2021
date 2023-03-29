import * as Sentry from '@sentry/nextjs'
import * as prismic from '@prismicio/client'
import Client from '@lib/prismic'
import todaysDate from '@lib/now'

export const emptyResponse = {
    data: null,
}

const linkPartial = `
    ...on category {
        ...categoryFields
    }
    ...on brand {
        ...brandFields
    }
    ...on page {
        ...pageFields
    }
`

const MENU_QUERY = `{
    main_navigation {
        body {
            ...on tab {
                non-repeat {
                    link_label
                    link_enabled
                    link {
                        ${linkPartial}
                    }
                    dropdown_menu {
                        ...on mega_menu {
                            ...mega_menuFields
                        }
                        ...on mm_secs {
                            ...mm_secsFields
                        }
                    }
                }
            }
        }
    }
}`

const FOOTER_QUERY = `{
    footer {
        legal
        body {
            ...on link_list {
                non-repeat {
                    description
                    list_title
                    is_social
                }
                repeat {
                    link {
                        ${linkPartial}
                    }
                    link_label
                }
            }
            ...on newsletter_form {
                non-repeat {
                    form_title
                    description
                    button_label
                    input_placeholder
                }
            }
        }
    }
}`

export const queryHeader = async ref => {
    return await Client().getSingle('main_navigation', {
        graphQuery: MENU_QUERY,
        ref,
    })
}

export const queryFooter = async ref => {
    return await Client().getSingle('footer', {
        graphQuery: FOOTER_QUERY,
        ref,
    })
}

export const queryBanner = async type => {
    const now = todaysDate()
    const bannerOptions = [
        prismic.predicate.dateAfter(`my.${type}.until`, now),
        prismic.predicate.dateBefore(`my.${type}.from`, now),
    ]

    return await querySingle({
        slug: type,
        options: {
            predicates: bannerOptions,
        },
        logError: false,
    })
}

export const queryByType = async (documentType, options = {}) => {
    const predicates = options?.predicates ?? []

    return await Client().getByType(documentType, {
        lang: process.env.PRISMIC_REPOSITORY_LOCALE,
        ...options,
        predicates: [...predicates],
    })
}

export const queryAllOfType = async (documentType, options = {}) => {
    const predicates = options?.predicates ?? []

    return await Client().getAllByType(documentType, {
        lang: process.env.PRISMIC_REPOSITORY_LOCALE,
        ...options,
        predicates: [...predicates],
    })
}

export const queryAllEvents = async () => {
    const now = todaysDate()
    return await queryAllOfType('event', {
        orderings: {
            field: 'my.event.expiry',
            direction: 'asc',
        },
        predicates: [prismic.predicate.dateAfter('my.event.expiry', now)],
    })
}

export const queryByUID = async (uid, documentType, options = {}) => {
    if (uid === null || documentType === null) {
        return emptyResponse
    }

    return await Client().getByUID(documentType, uid, options)
}

export const querySingle = async ({ slug, options, logError = true }) => {
    try {
        return await Client().getSingle(slug, options)
    } catch (error) {
        if (logError) {
            Sentry.captureException(error)
        }

        return emptyResponse
    }
}

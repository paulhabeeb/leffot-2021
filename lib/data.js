export const urls = {
    baseUrl: 'https://leffot.com',
    permanentUrl: 'https://store-gs88u3hwmj.mybigcommerce.com',
    apiUrl: 'https://api.bigcommerce.com/stores/gs88u3hwmj/',
    home: '/',
    account: {
        index: '/account',
        addresses: {
            all: '/account/address-book',
            add: '/account/address-book',
            edit: '/account/address-book',
        },
        details: '/account/settings',
        orders: {
            all: '/account',
            completed: '/account',
            create_return: '/account/orders/:orderId/create-return',
            single: '/account/orders/:orderId',
            single_base: '/account/orders/',
        },
        payment_methods: {
            all: '/account/payment-methods',
            add: '/account/payment-methods/add',
            edit: '/account/payment-methods/edit/:token',
        },
        returns: {
            all: '/account/returns',
        },
    },
    guest: {
        orders: {
            create_return: '/guest/orders/:orderId/create-return',
            single: '/guest/orders/:orderId',
        },
    },
    auth: {
        login: '/login',
        change_password: '/change-password',
        create_account: '/account/create',
        forgot_password: '/account/forgot-password',
    },
    brands: '/brands',
    cart: '/cart',
    checkout: {
        single_address: '/checkout',
        multiple_address: '/checkout',
    },
    compare: '/compare',
    gift_certificate: {
        purchase: '/products/gift-card',
        redeem: '/products/gift-card/redeem',
        balance: '/products/gift-card/check-balance',
    },
    menu: {
        preowned: {
            styles: [
                {
                    name: 'Oxfords',
                    url: '/pre-owned/styles/oxfords',
                },
                {
                    name: 'Derbys',
                    url: '/pre-owned/styles/derbys',
                },
                {
                    name: 'Boots',
                    url: '/pre-owned/styles/boots',
                },
                {
                    name: 'Loafers',
                    url: '/pre-owned/styles/loafers',
                },
                {
                    name: 'Monkstraps',
                    url: '/pre-owned/styles/monkstraps',
                },
                {
                    name: 'Moccasins',
                    url: '/pre-owned/styles/moccasins',
                },
            ],
        },
    },
    notFound: '/page-not-found',
    pages: {
        about: '/about',
        accessibility: '/accessibility',
        faq: '/frequently-asked-questions',
        journal: '/journal',
        pre_orders: '/pre-orders',
        returns: '/returns',
        sell_your_shoes: '/sell-your-shoes',
        shipping: '/shipping',
        sizing: '/sizing',
        terms_conditions: '/terms-and-conditions',
    },
    search: '/search',
}

export const email = {
    main: 'info@leffot.com',
    events: 'events@leffot.com',
    preowned: 'preowned@leffot.com',
    preorders: 'preorders@leffot.com',
}

export const giftCard = {
    breadcrumbs: [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'Accessories',
            url: '/categories/accessories',
        },
        {
            name: 'Gift Card',
            url: '/gift-cards',
        },
        {
            name: 'Purchase',
            url: '/gift-cards',
        },
    ],
    product: {
        brand: {
            name: 'Leffot',
        },
        cardType: 'gift-card',
        description:
            '<p>A Leffot gift card is the perfect choice for birthdays, holidays, or any other gift-giving occasion. Gift cards are delivered to the recipient by email and contain instructions on how to use them. A physical gift card is not sent.</p><p>Gift cards are valid for online or in-store purchases. Gift cards do not expire, are non-refundable, and may not be exchanged for cash.</p>',
        fields: {},
        images: [
            {
                altText: 'Leffot gift card',
                urlOriginal: '/gift-card.jpg',
            },
        ],
        isArchiveColl: false,
        isPreowned: false,
        isPreorder: false,
        name: 'Gift Card',
        path: urls.gift_certificate.purchase,
        seo: {
            canonical: `${urls.baseUrl}${urls.gift_certificate.purchase}`,
            metaDescription:
                'A Leffot gift card is the perfect choice for birthdays, holidays, or any other gift-giving occasion. Gift cards are delivered to the recipient by email and contain instructions on how to use them. A physical gift card is not sent.',
            pageTitle: 'Gift Card',
        },
        title: 'Gift Card',
    },
}

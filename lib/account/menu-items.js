import { urls } from '@lib/data'

const accountMenuItems = [
    {
        label: 'Orders',
        link: urls.account.orders.all,
    },
    {
        label: 'Address Book',
        link: urls.account.addresses.all,
    },
    {
        label: 'Account Settings',
        link: urls.account.details,
    },
]

export default accountMenuItems

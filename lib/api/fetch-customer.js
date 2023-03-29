import { queryAPI } from '@lib/api/bc-rest'

export default async function fetchCustomer(emailAddress) {
    const path = `v3/customers?email:in=${emailAddress}&include=attributes`

    const { data } = await queryAPI({
        path,
        method: 'GET',
    })

    return data.find(cust => cust.email === emailAddress)
}

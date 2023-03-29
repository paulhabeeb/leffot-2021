import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

function getWeightAndValue({ items, returnedItems }) {
    let weight = 0
    let value = 0

    returnedItems.forEach(returnedItem => {
        const foundItem = items.find(item => item.id === parseInt(returnedItem))
        weight += parseFloat(foundItem?.weight || 0)
        value += parseFloat(foundItem?.total_inc_tax || 0)
    })

    if (weight < 1) {
        weight = 1
    }

    return { value, weight }
}

function getShippingAddress(order) {
    if (order?.shipments?.length > 0) {
        const {
            city,
            company,
            country_iso2,
            first_name,
            last_name,
            phone,
            state,
            street_1,
            street_2,
            zip,
        } = order.shipments[0].shipping_address

        return {
            name: `${first_name} ${last_name}`,
            company,
            street1: street_1,
            street2: street_2,
            city,
            state,
            postalCode: zip,
            country: country_iso2,
            phone,
        }
    }

    return null
}

function getShipDate() {
    return new Date()
        .toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        })
        .replace(/\//g, '-')
        .replace(',', '')
}

export default async function createShippingLabel({
    labelRequested,
    order,
    returnedItems,
}) {
    if (labelRequested !== 'Yes') {
        return null
    }

    try {
        const { value, weight } = getWeightAndValue({
            items: order.products,
            returnedItems,
        })

        const axiosData = {
            carrierCode: 'stamps_com',
            confirmation: 'delivery',
            insuranceOptions: {
                insuredValue: value,
                insureShipment: true,
                provider: 'shipsurance',
            },
            packageCode: 'package',
            serviceCode: 'usps_priority_mail',
            shipDate: getShipDate(),
            shipFrom: getShippingAddress(order),
            shipTo: {
                city: 'New York',
                company: 'Leffot',
                country: 'US',
                name: 'Leffot',
                postalCode: '10014',
                state: 'NY',
                street1: '10 Christopher St',
            },
            testLabel: true,
            weight: {
                value: weight,
                units: 'pounds',
            },
        }

        const { data } = await axios({
            method: 'POST',
            url: 'https://ssapi.shipstation.com/shipments/createlabel',
            auth: {
                username: process.env.SHIPSTATION_KEY,
                password: process.env.SHIPSTATION_SECRET,
            },
            data: axiosData,
        })

        return data
    } catch (error) {
        Sentry.captureException(error)

        throw {
            error,
            message: 'Error creating shipping label',
        }
    }
}

import sgMail from '@sendgrid/mail'

function getCustomer(order) {
    const email = order?.billing_address?.email || ''
    const name = `${order?.billing_address?.first_name || ''} ${
        order?.billing_address?.last_name || ''
    }`

    return { email, name }
}

export async function sendCustomerEmail({
    attachment,
    items,
    labelRequested,
    order,
    returnPath,
}) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const returnLink = `https://leffot.com${returnPath}`
    const { email, name } = getCustomer(order)

    await sgMail.send({
        to: {
            email,
            name,
        },
        from: {
            email: 'info@leffot.com',
            name: 'Leffot',
        },
        templateId: 'd-f24be5e40a9642d58817a0f5e52593d1',
        dynamicTemplateData: {
            customer: name,
            items,
            labelRequested,
            returnLink,
        },
        attachments: [
            {
                content: attachment,
                filename: 'leffot-shipping-label.pdf',
                type: 'application/pdf',
                disposition: 'attachment',
            },
        ],
    })
}

export async function sendInternalEmail({ items, order }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const { name } = getCustomer(order)

    await sgMail.send({
        to: {
            email: 'info@leffot.com',
            name: 'Leffot',
        },
        from: {
            email: 'info@leffot.com',
            name: 'Leffot Returns',
        },
        templateId: 'd-2d2cf598de624fe3a1ed948c8789ecc4',
        dynamicTemplateData: {
            customer: name,
            items,
        },
    })
}

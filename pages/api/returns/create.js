import { captureException } from '@sentry/nextjs'
import createReturnItems from '@lib/orders/create-return-items'
import createReturnItemRow from '@lib/orders/create-return-item-row'
import createReturnRow from '@lib/orders/create-return-row'
import createShippingLabel from '@lib/orders/create-shipping-label'
import createReturnInsert from '@lib/orders/create-return-insert'
import updateReturnRow from '@lib/orders/update-return-row'
import {
    sendCustomerEmail,
    sendInternalEmail,
} from '@lib/orders/send-return-email-notification'

export default async function handler(req, res) {
    try {
        const { order, returnPath, values } = req.body
        const labelRequested = values.shipping_label

        // Generate a shipping label if one was requested
        const tracking = await createShippingLabel({
            labelRequested,
            order,
            returnedItems: Object.keys(values.products),
        })

        // Create the return in Supabase and get the return ID to use when we
        // create the return items in Supabase.
        const { returnId, returnUID } = await createReturnRow({
            order,
            tracking,
            values,
        })

        // Generate an array of return items so we can insert them with one
        // call in the next function.
        const returnItems = createReturnItems({
            items: values.products,
            order,
            returnId: returnUID,
        })

        // Create the rows for the return items in Supabase.
        await createReturnItemRow(returnItems)

        // Create the return insert and combine it with the shipping label
        const returnInsert = await createReturnInsert({
            items: returnItems,
            order,
            returnId,
            shippingLabel: tracking?.labelData,
        })
        await updateReturnRow({ returnUID, returnInsert })

        // Send emails to the customer and to ourselves confirming the return
        sendCustomerEmail({
            attachment: returnInsert.toString('base64'),
            items: returnItems,
            labelRequested: labelRequested === 'Yes',
            order,
            returnPath,
        })
        sendInternalEmail({
            items: returnItems,
            order,
        })

        // Send the return label back to the client
        const download = Buffer.from(returnInsert.toString('utf-8'), 'base64')

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=leffot-shipping-label.pdf'
        )

        res.end(download)
    } catch (error) {
        captureException(error)

        res.status(error?.response?.status || 400).send()
    }
}

import * as Sentry from '@sentry/nextjs'
import { supabase } from '@lib/supabase-client'

export default async function createReturnRow({ order, tracking, values }) {
    try {
        const customer_name = `${order?.billing_address?.first_name || ''} ${
            order?.billing_address?.last_name || ''
        }`

        const newReturn = {
            comments: values.comments,
            customer_email: order?.billing_address?.email || '',
            customer_id: order.customer_id,
            customer_name,
            customer_phone: order?.billing_address?.phone || '',
            label_requested: values.shipping_label === 'Yes',
            order_id: order.id,
            shipping_label: tracking?.labelData || '',
            shipping_method: tracking?.carrierCode || '',
            tracking_number: tracking?.trackingNumber || '',
        }

        const { data, error } = await supabase
            .from('returns')
            .insert([newReturn])
            .select()

        if (error) {
            throw error
        }

        return {
            returnId: data[0].return_id,
            returnUID: data[0].id,
        }
    } catch (error) {
        Sentry.captureException(error)

        throw {
            error,
            message: 'Error creating return row in Supabase',
        }
    }
}

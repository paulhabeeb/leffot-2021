import * as Sentry from '@sentry/nextjs'
import { supabase } from '@lib/supabase-client'

export default async function createReturnItemRow(returnItems) {
    try {
        const { error } = await supabase
            .from('return_items')
            .insert(returnItems, {
                returning: 'minimal',
            })

        if (error) {
            throw error
        }
    } catch (error) {
        Sentry.captureException(error)

        throw {
            error,
            message: 'Error creating return items rows in Supabase',
        }
    }
}

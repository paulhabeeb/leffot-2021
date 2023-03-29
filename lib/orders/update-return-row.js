import * as Sentry from '@sentry/nextjs'
import { supabase } from '@lib/supabase-client'

export default async function updateReturnRow({ returnUID, returnInsert }) {
    try {
        const { error } = await supabase
            .from('returns')
            .update({ return_insert: returnInsert })
            .match({ id: returnUID })

        if (error) {
            throw error
        }
    } catch (error) {
        Sentry.captureException(error)

        throw {
            error,
            message: 'Error updating return row in Supabase',
        }
    }
}

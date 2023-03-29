import { supabase } from '@lib/supabase-client'

export default async function findReturn(orderId) {
    const { data, error } = await supabase
        .from('returns')
        .select('id, return_id, return_items!inner(*)')
        .eq('order_id', orderId)

    if (error) {
        return null
    }

    return data
}

import { useEvent } from '@lib/use-event'

export default function useOutsideAlerter(ref, callback) {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback(event)
        }
    }

    useEvent('click', handleClickOutside)
}

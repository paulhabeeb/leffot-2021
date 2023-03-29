export const compareDates = (from = null, until = null) => {
    const today = new Date()
    const fromDate = new Date(from)
    const untilDate = new Date(until)

    if (
        (fromDate && untilDate && today >= fromDate && today <= untilDate) ||
        (untilDate && !fromDate && today <= untilDate) ||
        (fromDate && !untilDate && today >= fromDate)
    ) {
        return true
    }

    return false
}

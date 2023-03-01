/**
 * Get Completed Percentage
 */
const getCompletedPct = () => (_cause, _integer = false) => {
    /* Validate amount requested. */
    if (!_cause.requested || _cause.requested === 0) {
        return 0
    }

    /* Calculate completion percentage. */
    const completedPct = (_cause.pledged / _cause.requested)

    /* Validate integer flag. */
    if (_integer) {
        return parseInt(completedPct * 100)
    } else {
        return completedPct
    }
}

/* Export module. */
export default getCompletedPct

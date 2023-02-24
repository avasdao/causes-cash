/* Import modules. */
import numeral from 'numeral'

/**
 * Get Format Funded
 */
const getFormatFunded = (state, getters) => (_cause) => {
    /* Set percentage. */
    const pct = _cause.pct

    /* Initialize formatted. */
    let formatted = null

    /* Validate percentage flag. */
    if (pct === 0) {
        formatted = 'ongoing'
    } else {
        /* Set completed percentage. */
        const completePct = getters.getCompletedPct(_cause)

        /* Format percentage. */
        formatted = numeral(completePct).format('0.00%')
    }

    /* Return formatted. */
    return formatted
}

/* Export module. */
export default getFormatFunded

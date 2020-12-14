/**
 * Get Advertisement Display
 */
const getAdDisplay = (state) => {
    /* Validate state. */
    if (!state || !state.adDisplay) {
        return null
    }

    /* Initialize Ad display. */
    const adDisplay = state.adDisplay

    /* Return Ad display. */
    return adDisplay
}

/* Export module. */
export default getAdDisplay

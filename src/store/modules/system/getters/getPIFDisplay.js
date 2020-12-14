/**
 * Get PIF Display
 */
const getPIFDisplay = (state) => {
    /* Validate state. */
    if (!state || !state.pifDisplay) {
        return null
    }

    /* Initialize PIF display. */
    const pifDisplay = state.pifDisplay

    /* Return PIF display. */
    return pifDisplay
}

/* Export module. */
export default getPIFDisplay

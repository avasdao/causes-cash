/**
 * Get Profile Display
 */
const getProfileDisplay = (state) => {
    /* Validate state. */
    if (!state || !state.profileDisplay) {
        return null
    }

    /* Initialize Profile display. */
    const profileDisplay = state.profileDisplay

    /* Return Profile display. */
    return profileDisplay
}

/* Export module. */
export default getProfileDisplay

/**
 * Get Title Visibility
 */
const getTitleVisibility = (state) => {
    /* Validate state. */
    if (typeof state === 'undefined' || typeof state.titleVisibility === 'undefined') {
        return null
    }

    /* Initialize title visibility. */
    const titleVisbility = state.titleVisibility

    /* Return title visibility. */
    return titleVisbility
}

/* Export module. */
export default getTitleVisibility

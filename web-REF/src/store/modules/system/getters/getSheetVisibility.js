/**
 * Get Sheet Visibility
 */
const getSheetVisibility = (state) => {
    /* Validate state. */
    if (typeof state === 'undefined' || typeof state.sheetVisibility === 'undefined') {
        return null
    }

    /* Initialize sheet visibility. */
    const sheetVisbility = state.sheetVisibility

    /* Return sheet visibility. */
    return sheetVisbility
}

/* Export module. */
export default getSheetVisibility

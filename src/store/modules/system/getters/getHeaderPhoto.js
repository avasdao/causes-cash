/**
 * Get Header Photo
 */
const getHeaderPhoto = (state) => {
    /* Validate state. */
    if (!state || !state.headerPhoto) {
        return null
    }

    /* Set header photo. */
    const headerPhoto = state.headerPhoto

    /* Return header photo. */
    return headerPhoto
}

/* Export module. */
export default getHeaderPhoto

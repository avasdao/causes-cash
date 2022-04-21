/**
 * Get Email Address
 */
const getEmail = (state) => {
    /* Validate state. */
    if (!state || !state.email) {
        return null
    }

    /* Return email. */
    return state.email
}

/* Export module. */
export default getEmail

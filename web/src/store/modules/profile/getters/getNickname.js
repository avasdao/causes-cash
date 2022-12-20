/**
 * Get Nickname
 */
const getNickname = (state) => {
    /* Validate state. */
    if (!state || !state.nickname) {
        return null
    }

    /* Return nickname. */
    return state.nickname
}

/* Export module. */
export default getNickname

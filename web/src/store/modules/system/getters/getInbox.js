/**
 * Get Inbox
 */
const getInbox = (state) => {
    /* Validate state. */
    if (!state || !state.inbox) {
        return null
    }

    /* Initialize inbox. */
    const inbox = state.inbox

    /* Return inbox. */
    return inbox
}

/* Export module. */
export default getInbox

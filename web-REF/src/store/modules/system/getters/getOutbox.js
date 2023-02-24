/**
 * Get Outbox
 */
const getOutbox = (state) => {
    /* Validate state. */
    if (!state || !state.outbox) {
        return null
    }

    /* Initialize outbox. */
    const outbox = state.outbox

    /* Return outbox. */
    return outbox
}

/* Export module. */
export default getOutbox

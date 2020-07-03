/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Outbox
 */
const getOutbox = (state) => {
    /* Validate state. */
    if (!state || !state.outbox) {
        return null
    }

    /* Initialize outbox. */
    const outbox = msgpack.decode(Buffer.from(state.outbox))

    /* Return outbox. */
    return outbox
}

/* Export module. */
export default getOutbox

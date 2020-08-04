/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Inbox
 */
const getInbox = (state) => {
    /* Validate state. */
    if (!state || !state.inbox) {
        return null
    }

    /* Initialize inbox. */
    const inbox = msgpack.decode(Buffer.from(state.inbox, 'hex'))

    /* Return inbox. */
    return inbox
}

/* Export module. */
export default getInbox

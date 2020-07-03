/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Outbox
 *
 * This is the user's outbox of coins waiting to be sent from purse.
 */
const setOutbox = (state, _outbox) => {
    /* Set outbox. */
    state.outbox = msgpack.encode(_outbox)
}

/* Export module. */
export default setOutbox

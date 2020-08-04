/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Inbox
 *
 * This is the user's inbox of coins waiting to be processed by the purse.
 */
const setInbox = (state, _inbox) => {
    /* Set inbox. */
    state.inbox = msgpack.encode(_inbox).toString('hex')
}

/* Export module. */
export default setInbox

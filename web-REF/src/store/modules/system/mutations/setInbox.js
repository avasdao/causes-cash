/**
 * Set Inbox
 *
 * This is the user's inbox of coins waiting to be processed by the purse.
 */
const setInbox = (state, _inbox) => {
    /* Set inbox. */
    state.inbox = _inbox
}

/* Export module. */
export default setInbox

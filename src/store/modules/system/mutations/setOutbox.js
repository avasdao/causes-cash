/**
 * Set Outbox
 *
 * This is the user's outbox of coins waiting to be sent from purse.
 */
const setOutbox = (state, _outbox) => {
    /* Set outbox. */
    state.outbox = _outbox
}

/* Export module. */
export default setOutbox

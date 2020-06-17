/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Account
 */
const setAccount = (state, _account) => {
    /* Set account. */
    state.account = msgpack.encode(_account)
}

/* Export module. */
export default setAccount

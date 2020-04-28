/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Accounts
 */
const setAccounts = (state, _accounts) => {
    /* Set accounts. */
    state.a = msgpack.encode(_accounts)
}

/* Export module. */
export default setAccounts

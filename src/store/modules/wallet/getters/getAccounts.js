/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Accounts
 *
 * Returns (addresses for) ALL (in-use) receiving accounts.
 */
const getAccounts = (state) => {
    /* Validate state (of accounts). */
    if (!state || !state.a) {
        return null
    }

    /* Initialize accounts. */
    const accounts = msgpack.decode(Buffer.from(state.a))

    /* Return accounts. */
    return accounts
}

/* Export module. */
export default getAccounts

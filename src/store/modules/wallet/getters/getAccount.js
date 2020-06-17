/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Account
 *
 * Returns all addresses and metadata for the current wallet.
 */
const getAccount = (state) => {
    /* Validate state (of account). */
    if (!state || !state.account) {
        return null
    }

    /* Initialize account. */
    const account = msgpack.decode(Buffer.from(state.account))

    /* Return account. */
    return account
}

/* Export module. */
export default getAccount

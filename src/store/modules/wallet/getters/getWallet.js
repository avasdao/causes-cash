/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Wallet
 *
 * Returns all addresses and metadata for the current wallet.
 */
const getWallet = (state) => {
    /* Validate state. */
    if (!state || !state.wallet) {
        return null
    }

    /* Initialize wallet. */
    const wallet = msgpack.decode(Buffer.from(state.wallet, 'hex'))

    /* Return wallet. */
    return wallet
}

/* Export module. */
export default getWallet

/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Wallet
 */
const setWallet = (state, _wallet) => {
    /* Set wallet. */
    state.wallet = msgpack.encode(_wallet)
}

/* Export module. */
export default setWallet

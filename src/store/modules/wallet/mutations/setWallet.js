/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Wallet
 */
const setWallet = (state, _wallet) => {
    /* Set wallet. */
    state.wallet = msgpack.encode(_wallet).toString('hex')
}

/* Export module. */
export default setWallet

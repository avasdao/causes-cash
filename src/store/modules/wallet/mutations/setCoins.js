/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Coins
 */
const setCoins = (state, _coins) => {
    /* Set coins. */
    state.coins = msgpack.encode(_coins).toString('hex')
}

/* Export module. */
export default setCoins

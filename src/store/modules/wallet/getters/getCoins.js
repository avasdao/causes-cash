/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Coins
 */
const getCoins = (state) => {
    /* Validate state. */
    if (!state || !state.coins) {
        return null
    }

    /* Initialize coins. */
    const coins = msgpack.decode(Buffer.from(state.coins, 'hex'))

    /* Return coins. */
    return coins
}

/* Export module. */
export default getCoins

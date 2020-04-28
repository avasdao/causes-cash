/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Imported (Wallet) Seeds
 *
 * New seeds are typically imported from BCH sponsors.
 * eg. https://nito.cash?47a49dfe-2fe4-4343-b81e-947580f243f0
 *     will generate a new seed `47a49dfe-2fe4-4343-b81e-947580f243f0`
 */
const setImportedSeeds = (state, _seeds) => {
    /* Set imported (wallets) seeds. */
    state.is = msgpack.encode(_seeds)
}

/* Export module. */
export default setImportedSeeds

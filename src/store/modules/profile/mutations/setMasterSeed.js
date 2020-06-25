/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Master Seed
 *
 * This is the user's primary (private key) seed.
 */
const setMasterSeed = (state, _seed) => {
    /* Set master seed. */
    state.masterSeed = msgpack.encode(_seed)
}

/* Export module. */
export default setMasterSeed

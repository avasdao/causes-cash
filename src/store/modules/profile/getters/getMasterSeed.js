/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Validate state. */
    if (!state || !state.masterSeed) {
        return null
    }

    /* Return master seed. */
    return msgpack.decode(Buffer.from(state.masterSeed))
}

/* Export module. */
export default getMasterSeed

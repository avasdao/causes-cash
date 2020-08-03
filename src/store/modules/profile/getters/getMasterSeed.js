/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Validate state. */
    if (!state || !state.masterSeed) {
        return null
    }

    /* Return master seed. */
    try {
        return Buffer.from(state.masterSeed, 'hex')
    } catch (err) {
        return msgpack.decode(Buffer.from(state.masterSeed)) // DEPRECATED on 2020.7.6
    }
}

/* Export module. */
export default getMasterSeed

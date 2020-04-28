/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Flags
 */
const getFlags = (state) => {
    /* Validate state (of flags). */
    if (!state || !state.flags) {
        return null
    }

    /* Initialize accounts. */
    const flags = msgpack.decode(Buffer.from(state.flags))

    /* Return flags. */
    return flags
}

/* Export module. */
export default getFlags

/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Flags
 */
const getFlags = (state) => {
    /* Validate state. */
    if (!state || !state.flags) {
        return null
    }

    /* Initialize flags. */
    let flags = null

    /* Initialize accounts. */
    try {
        flags = msgpack.decode(Buffer.from(state.flags, 'hex'))
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        flags = state.flags // DEPRECATED in June '20
    }

    /* Return flags. */
    return flags
}

/* Export module. */
export default getFlags

/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Email Address
 */
const getEmail = (state) => {
    /* Validate state (of flags). */
    if (!state || !state.email) {
        return null
    }

    /* Return email. */
    return msgpack.decode(Buffer.from(state.email))
}

/* Export module. */
export default getEmail

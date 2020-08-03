/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Email Address
 */
const getEmail = (state) => {
    /* Validate state. */
    if (!state || !state.email) {
        return null
    }

    /* Return email. */
    return msgpack.decode(Buffer.from(state.email, 'hex'))
}

/* Export module. */
export default getEmail

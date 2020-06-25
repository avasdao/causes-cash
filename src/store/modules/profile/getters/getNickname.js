/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Nickname
 */
const getNickname = (state) => {
    /* Validate state. */
    if (!state || !state.nickname) {
        return null
    }

    /* Return nickname. */
    return msgpack.decode(Buffer.from(state.nickname))
}

/* Export module. */
export default getNickname

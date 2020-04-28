/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Nickname
 */
const getNickname = (state) => {
    /* Return nickname. */
    return msgpack.decode(Buffer.from(state.nickname))
}

/* Export module. */
export default getNickname

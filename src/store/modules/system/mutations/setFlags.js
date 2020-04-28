/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Flags
 */
const setFlags = (state, _flags) => {
    /* Set flags. */
    state.flags = msgpack.encode(_flags)
}

/* Export module. */
export default setFlags

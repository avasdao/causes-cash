/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Metadata
 */
const setMetadata = (state, _metadata) => {
    /* Set metadata. */
    state.m = msgpack.encode(_metadata)
}

/* Export module. */
export default setMetadata

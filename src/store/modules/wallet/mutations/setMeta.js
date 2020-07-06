/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Metadata
 */
const setMetadata = (state, _metadata) => {
    /* Set metadata. */
    state.meta = msgpack.encode(_metadata).toString('hex')
}

/* Export module. */
export default setMetadata

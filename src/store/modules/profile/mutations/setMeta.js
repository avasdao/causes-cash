/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Metadata
 */
const setMetadata = (state, _metadata) => {
    /* Set metadata. */
    state.meta = msgpack.encode(_metadata).toString('hex')
}

/* Export module. */
export default setMetadata

/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Indices
 */
const getIndices = (state) => {
    /* Validate state. */
    if (!state || !state.indices) {
        return null
    }

    /* Initialize indices. */
    const indices = msgpack.decode(Buffer.from(state.indices, 'hex'))

    /* Return indices. */
    return indices
}

/* Export module. */
export default getIndices

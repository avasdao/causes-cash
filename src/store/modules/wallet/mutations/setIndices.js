/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Indices
 */
const setIndices = (state, _indices) => {
    /* Set indices. */
    state.indices = msgpack.encode(_indices).toString('hex')
}

/* Export module. */
export default setIndices

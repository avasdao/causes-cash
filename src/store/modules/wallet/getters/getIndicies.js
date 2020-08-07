/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Indicies
 */
const getIndicies = (state) => {
    /* Validate state. */
    if (!state || !state.indicies) {
        return null
    }

    /* Initialize indicies. */
    const indicies = msgpack.decode(Buffer.from(state.indicies, 'hex'))

    /* Return indicies. */
    return indicies
}

/* Export module. */
export default getIndicies

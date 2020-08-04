/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Watching
 *
 * Allows us to update a stored asset resource.
 */
const setWatching = (state, _watching) => {

    /* Update the asset resource. */
    state.watching = msgpack.encode(_watching).toString('hex')
}

/* Export module. */
export default setWatching

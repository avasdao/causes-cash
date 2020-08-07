/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Indicies
 */
const setIndicies = (state, _indicies) => {
    /* Set indicies. */
    state.indicies = msgpack.encode(_indicies).toString('hex')
}

/* Export module. */
export default setIndicies

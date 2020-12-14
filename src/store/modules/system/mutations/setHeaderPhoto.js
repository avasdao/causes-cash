/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Current Page
 */
const setCurrentPage = (state, _photo) => {
    /* Set locale. */
    state.headerPhoto = msgpack.encode(_photo).toString('hex')
}

/* Export module. */
export default setCurrentPage

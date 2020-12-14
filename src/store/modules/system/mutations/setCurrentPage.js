/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Current Page
 */
const setCurrentPage = (state, _page) => {
    /* Set locale. */
    state.currentPage = msgpack.encode(_page).toString('hex')
}

/* Export module. */
export default setCurrentPage

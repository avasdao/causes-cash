/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Get Current Page
 */
const getCurrentPage = (state) => {
    /* Validate state. */
    if (!state || !state.currentPage) {
        return null
    }

    /* Set current page. */
    const currentPage = msgpack.decode(Buffer.from(state.currentPage, 'hex'))

    /* Validate current page. */
    if (currentPage) {
        /* Return currentPage. */
        return currentPage
    } else {
        /* Return default. */
        return 'discover'
    }

}

/* Export module. */
export default getCurrentPage
